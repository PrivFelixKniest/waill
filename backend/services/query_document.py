from fastapi import HTTPException
from datetime import datetime

from db.database import DB_Session
from db.database_schemas import User, Well, Message, Creator
from routers.auth_schema import VerifySchema
from routers.query_documents_schemas import QuerySchema
import time

from openai import OpenAI

from services.encryption import decrypt


def post_message(well_id: int, query: QuerySchema, _auth_result: VerifySchema):
    try:
        with DB_Session.begin() as db:
            # Fetch User
            try:
                user = db.query(User).where(User.auth0_user_id == _auth_result["sub"]).first()
            except Exception as e:
                print("wierd error")
                print(e)
                raise Exception("Init DB Fetch Error")
            if user is None:
                raise Exception("User is None Error")

            well = db.query(Well).where(Well.id == well_id).first()
            if well is None:
                raise Exception("Well is None Error")

            # Authorization Check
            if user.id != well.user_id:
                raise Exception("Unauthorized Access Key Error")

            # Create client
            client = OpenAI(api_key=decrypt(well.openai_api_key))

            message = client.beta.threads.messages.create(thread_id=well.thread_id,
                                                content=query.question,
                                                role="user",)

            run = client.beta.threads.runs.create(thread_id=well.thread_id, assistant_id=well.assistant_id)

            user_db_message = Message(
                well_id=well_id,
                creator="user",
                content=query.question,
                message_id=message.id,
                message_index=get_next_message_index_for_well(db=db,
                                                              well_id=well_id))

            db.add(user_db_message)

            return {
                "run_id": run.id,
                "model": run.model,
                "instructions": run.instructions,
                "file_ids": run.file_ids,
                "run_status": run.status
            }

    except Exception as e:
        print(e)
        if "Connection error." in str(e) or "Incorrect API key provided" in str(e):
            raise HTTPException(status_code=422,
                                detail="Creating an OpenAI client was unsuccessful, most likely due to an incorrect key")
        if "User is None Error" in str(e):
            raise HTTPException(
                status_code=404,
                detail="The user extracted from the auth token does not yet exist in the Database."
            )
        if "Well is None Error" in str(e):
            raise HTTPException(status_code=404, detail="The well you are trying to access does not exist.")
        if "Init DB Fetch Error" in str(e):
            raise HTTPException(status_code=424,
                                detail="The initial database fetch for the user information failed, failed dependency.")
        if "Unauthorized Access Key Error" in str(e):
            raise HTTPException(status_code=403, detail="Your Access Token does not allow access to this Well.")

        raise HTTPException(status_code=500, detail="Internal Server Error")


def get_next_message_index_for_well(db: DB_Session, well_id: int) -> int:
    # read through prev. messages to get index
    db_messages = db.query(Message).where(Message.well_id == well_id).all()

    next_message_index = 0

    for db_message in db_messages:
        if db_message.message_index >= next_message_index:
            next_message_index = db_message.message_index + 1

    return next_message_index


def save_response_to_db(run_id: str, well_id: int, _auth_result: VerifySchema):
    with DB_Session.begin() as db:
        # Fetch User
        try:
            user = db.query(User).where(User.auth0_user_id == _auth_result["sub"]).first()
        except Exception:
            raise Exception("Init DB Fetch Error")
        if user is None:
            raise Exception("User is None Error")

        well = db.query(Well).where(Well.id == well_id).first()
        if well is None:
            raise Exception("Well is None Error")

        # Authorization Check
        if user.id != well.user_id:
            raise Exception("Unauthorized Access Key Error")

        # Create client
        client = OpenAI(api_key=decrypt(well.openai_api_key))

        run = client.beta.threads.runs.retrieve(thread_id=well.thread_id, run_id=run_id)

        # run.status possible string Literals: [
        # "queued", "in_progress", "requires_action", "cancelling", "cancelled", "failed", "completed", "expired"
        # ]
        while run.status not in ["failed", "requires_action", "cancelled", "completed", "expired"]:
            time.sleep(1)
            run = client.beta.threads.runs.retrieve(thread_id=well.thread_id, run_id=run_id)

        if run.status in ["failed", "requires_action", "cancelled", "expired"]:
            return

        # Get message and post it in DB
        messages = client.beta.threads.messages.list(thread_id=well.thread_id)

        message = messages.data[0]

        assistant_db_message = Message(well_id=well_id,
                                       creator="assistant",
                                       content=message.content[0].text.value,
                                       message_id=message.id,
                                       message_index=get_next_message_index_for_well(db=db,
                                                                                     well_id=well_id))

        db.add(assistant_db_message)
        db.flush()


def get_run_and_response(run_id: str, well_id: int, _auth_result: VerifySchema):
    try:
        with DB_Session.begin() as db:
            # Fetch User
            try:
                user = db.query(User).where(User.auth0_user_id == _auth_result["sub"]).first()
            except Exception:
                raise Exception("Init DB Fetch Error")
            if user is None:
                raise Exception("User is None Error")

            well = db.query(Well).where(Well.id == well_id).first()
            if well is None:
                raise Exception("Well is None Error")

            # Authorization Check
            if user.id != well.user_id:
                raise Exception("Unauthorized Access Key Error")

            # Create client
            client = OpenAI(api_key=decrypt(well.openai_api_key))

            run = client.beta.threads.runs.retrieve(thread_id=well.thread_id, run_id=run_id)

            # run.status possible string Literals: [
            # "queued", "in_progress", "requires_action", "cancelling", "cancelled", "failed", "completed", "expired"
            # ]
            if run.status in ["failed", "requires_action", "cancelled", "expired"]:
                return {
                    "run_id": run.id,
                    "model": run.model,
                    "instructions": run.instructions,
                    "file_ids": run.file_ids,
                    "run_status": run.status,
                    "last_error": run.last_error.message
                }

            elif run.status == "completed":
                # Get message and return it
                messages = client.beta.threads.messages.list(thread_id=well.thread_id)

                message = messages.data[0]

                return {
                    "run_id": run.id,
                    "model": run.model,
                    "instructions": run.instructions,
                    "file_ids": run.file_ids,
                    "run_status": run.status,
                    "response": {
                        "created_at": datetime.now(),
                        "creator": Creator.assistant,
                        "content": message.content[0].text.value
                    }
                }

            else:
                return {
                    "run_id": run.id,
                    "model": run.model,
                    "instructions": run.instructions,
                    "file_ids": run.file_ids,
                    "run_status": run.status
                }

    except Exception as e:
        print(e)
        if "Connection error." in str(e) or "Incorrect API key provided" in str(e):
            raise HTTPException(status_code=422,
                                detail="Creating an OpenAI client was unsuccessful, most likely due to an incorrect key")
        if "User is None Error" in str(e):
            raise HTTPException(
                status_code=404,
                detail="The user extracted from the auth token does not yet exist in the Database."
            )
        if "Well is None Error" in str(e):
            raise HTTPException(status_code=404, detail="The well you are trying to access does not exist.")
        if "Init DB Fetch Error" in str(e):
            raise HTTPException(status_code=424,
                                detail="The initial database fetch for the user information failed, failed dependency.")
        if "Unauthorized Access Key Error" in str(e):
            raise HTTPException(status_code=403, detail="Your Access Token does not allow access to this Well.")

        raise HTTPException(status_code=500, detail="Internal Server Error")
