from fastapi import HTTPException

from db.database import DB_Session
from routers.auth_schema import VerifySchema
from routers.well_schemas import PostWellSchema
from db.database_schemas import User, Well, File, Message

from openai import OpenAI

from services.encryption import encrypt, decrypt


def post_well(well: PostWellSchema, _auth_result: VerifySchema):
    try:
        with DB_Session.begin() as db:
            # Fetch User
            try:
                user = db.query(User).where(User.auth0_user_id == _auth_result["sub"]).first()
            except Exception:
                raise Exception("Init DB Fetch Error")
            if user is None:
                raise Exception("User is None Error")

            # Create client
            client = OpenAI(api_key=well.openai_api_key)

            assistant = client.beta.assistants.create(
                name=well.name,
                model=well.model,
                instructions=well.instructions,
                tools=[{"type": "retrieval"}],
            )

            thread = client.beta.threads.create()

            new_well = Well(name=well.name, openai_api_key=encrypt(well.openai_api_key), instructions=well.instructions, model=well.model, user_id=user.id, assistant_id=assistant.id, thread_id=thread.id)
            db.add(new_well)
            db.flush()
            return {
                "id": new_well.id,
                "name": new_well.name,
                "model": new_well.model,
                "instructions": new_well.instructions,
                "user_id": new_well.user_id,
                "messages": [],
                "created_at": new_well.created_at,
                "updated_at": new_well.updated_at
            }
    except Exception as e:
        if "Connection error." in str(e) or "Incorrect API key provided" in str(e):
            raise HTTPException(status_code=422, detail="Creating an OpenAI client was unsuccessful, most likely due to an incorrect key")
        if "The requested model" in str(e) and "does not exist." in str(e):
            raise HTTPException(status_code=400, detail="Requested Model does not exist.")
        if "User is None Error" in str(e):
            raise HTTPException(
                status_code=404,
                detail="The user extracted from the auth token does not yet exist in the Database."
            )
        if "Init DB Fetch Error" in str(e):
            raise HTTPException(status_code=424, detail="The initial database fetch for the user information failed, failed dependency.")

        raise HTTPException(status_code=500, detail="Internal Server Error")


def delete_well(well_id: int, _auth_result: VerifySchema):
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

            # Delete Files
            files = db.query(File).where(File.well_id == well_id).all()
            for file in files:
                try:
                    client.files.delete(file_id=file.file_id)
                except Exception as e:
                    if "No such File object" in str(e):
                        pass
                    else:
                        raise e
                try:
                    client.beta.assistants.files.delete(assistant_id=well.assistant_id, file_id=file.file_id)
                except Exception as e:
                    if "No such File object" in str(e) or "No assistant found with id" in str(e):
                        pass
                    else:
                        raise e

                db.delete(file)

            try:
                client.beta.assistants.delete(assistant_id=well.assistant_id)
            except Exception as e:
                if "No assistant found with id" in str(e):
                    pass
                else:
                    raise e

            try:
                client.beta.threads.delete(thread_id=well.thread_id)
            except Exception as e:
                if "No thread found with id" in str(e):
                    pass
                else:
                    raise e

            # get Messages for well
            messages = db.query(Message).where(Message.well_id == well.id).all()
            messages_output = []
            for message in messages:
                messages_output.append({
                    "id": message.id,
                    "content": message.content,
                    "message_index": message.message_index,
                    "created_at": message.created_at,
                    "creator": message.creator
                })
                db.delete(message)

            db.delete(well)
            return {
                "id": well.id,
                "name": well.name,
                "model": well.model,
                "instructions": well.instructions,
                "user_id": well.user_id,
                "messages": reversed(messages_output),
                "created_at": well.created_at,
                "updated_at": well.updated_at
            }
    except Exception as e:
        if "Connection error." in str(e):
            raise HTTPException(status_code=422, detail="Creating an OpenAI client was unsuccessful, most likely due to an incorrect key")
        if "The requested model" in str(e) and "does not exist." in str(e):
            raise HTTPException(status_code=400, detail="Requested Model does not exist.")
        if "Well is None Error" in str(e):
            raise HTTPException(status_code=404, detail="The well you are trying to delete does not exist.")
        if "User is None Error" in str(e):
            raise HTTPException(
                status_code=404,
                detail="The user extracted from the auth token does not yet exist in the Database."
            )
        if "Init DB Fetch Error" in str(e):
            raise HTTPException(status_code=424, detail="The initial database fetch for the user information failed, failed dependency.")
        if "Unauthorized Access Key Error" in str(e):
            raise HTTPException(status_code=403, detail="Your Access Token does not allow access to this Well.")

        raise HTTPException(status_code=500, detail="Internal Server Error")


def get_well(_auth_result: VerifySchema):
    try:
        with DB_Session.begin() as db:
            # Fetch User
            try:
                user = db.query(User).where(User.auth0_user_id == _auth_result["sub"]).first()
            except Exception:
                raise Exception("Init DB Fetch Error")
            if user is None:
                raise Exception("User is None Error")

            # get Wells
            wells = db.query(Well).where(Well.user_id == user.id).all()

            wells_output = []

            for well in wells:
                # get Messages for well
                messages = db.query(Message).where(Message.well_id == well.id).all()
                messages_output = []
                for message in messages:
                    messages_output.append({
                        "id": message.id,
                        "content": message.content,
                        "message_index": message.message_index,
                        "created_at": message.created_at,
                        "creator": message.creator
                    })

                wells_output.append({
                    "id": well.id,
                    "name": well.name,
                    "model": well.model,
                    "instructions": well.instructions,
                    "user_id": well.user_id,
                    "messages": reversed(messages_output),
                    "created_at": well.created_at,
                    "updated_at": well.updated_at
                })

            return wells_output
    except Exception as e:
        if "User is None Error" in str(e):
            raise HTTPException(
                status_code=404,
                detail="The user extracted from the auth token does not yet exist in the Database."
            )
        if "Init DB Fetch Error" in str(e):
            raise HTTPException(status_code=424, detail="The initial database fetch for the user information failed, failed dependency.")

        raise HTTPException(status_code=500, detail="Internal Server Error")
