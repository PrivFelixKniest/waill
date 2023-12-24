from fastapi import HTTPException, UploadFile

from db.database import DB_Session
from routers.auth_schema import VerifySchema
from routers.well_schemas import PostWellSchema
from db.database_schemas import User, Well

from openai import OpenAI

from services.encryption import encrypt, decrypt


def post_upload_file(well_id: int, upload_file: UploadFile, _auth_result: VerifySchema):
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

            # TODO: Add error handling for files sizes that are too large!
            file = client.files.create(file=upload_file.file.read(), purpose="assistants")

            client.beta.assistants.files.create(assistant_id=well.assistant_id, file_id=file.id)

            return {
                "id": well.id,
                "name": well.name,
                "model": well.model,
                "instructions": well.instructions,
                "user_id": well.user_id,
                "created_at": well.created_at,
                "updated_at": well.updated_at
            }
    except Exception as e:
        print(e)
        if "Connection error." in str(e) or "Incorrect API key provided" in str(e):
            raise HTTPException(status_code=422, detail="Creating an OpenAI client was unsuccessful, most likely due to an incorrect key")
        if "User is None Error" in str(e):
            raise HTTPException(
                status_code=404,
                detail="The user extracted from the auth token does not yet exist in the Database."
            )
        if "Well is None Error" in str(e):
            raise HTTPException(status_code=404, detail="The well you are trying to use does not exist.")
        if "Init DB Fetch Error" in str(e):
            raise HTTPException(status_code=424, detail="The initial database fetch for the user information failed, failed dependency.")
        if "Unauthorized Access Key Error" in str(e):
            raise HTTPException(status_code=403, detail="Your Access Token does not allow access to this Well.")

        raise HTTPException(status_code=500, detail="Internal Server Error")
