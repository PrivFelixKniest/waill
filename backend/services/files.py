from fastapi import HTTPException, UploadFile

from db.database import DB_Session
from routers.auth_schema import VerifySchema
from routers.well_schemas import PostWellSchema
from db.database_schemas import User, Well, File

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

            new_file = File(well_id=well_id, file_id=file.id, file_name=upload_file.filename, file_type=upload_file.content_type)

            db.add(new_file)
            db.flush()

            return {
                    "id": new_file.id,
                    "file_name": new_file.file_name,
                    "file_type": new_file.file_type,
                    "created_at": new_file.created_at,
                    "updated_at": new_file.updated_at
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
        if "Assistant support at most 20 files, remove some files before adding new ones." in str(e):
            raise HTTPException(status_code=412, detail="The Well is already full, please remove files before adding new ones.")
        if "Failed to index file: Unsupported file" in str(e):
            raise HTTPException(status_code=400, detail="The provided file has an unsupported filetype.")


        raise HTTPException(status_code=500, detail="Internal Server Error")


def get_files(well_id: int, _auth_result: VerifySchema):
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

            files = db.query(File).where(File.well_id == well_id).all()

            response = []

            for file in files:
                response.append({
                    "id": file.id,
                    "file_name": file.file_name,
                    "file_type": file.file_type,
                    "created_at": file.created_at,
                    "updated_at": file.updated_at
                })

            return response
    except Exception as e:
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


def delete_file(well_id: int, file_id: int, _auth_result: VerifySchema):
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

            file = db.query(File).where(File.id == file_id).first()
            if file is None:
                raise Exception("File is None Error")

            # Authorization Check
            if user.id != well.user_id:
                raise Exception("Unauthorized Access Key Error")
            if file.well_id != well.id:
                raise Exception("File id does not belong to provided Well.")

            # Create client
            client = OpenAI(api_key=decrypt(well.openai_api_key))

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
                if "No such File object" in str(e):
                    pass
                else:
                    raise e

            db.delete(file)
            db.flush()

            return {
                    "id": file.id,
                    "file_name": file.file_name,
                    "file_type": file.file_type,
                    "created_at": file.created_at,
                    "updated_at": file.updated_at
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
            raise HTTPException(status_code=404, detail="The well you are trying to access does not exist.")
        if "File is None Error" in str(e):
            raise HTTPException(status_code=404, detail="The file you are trying to delete does not exist.")
        if "Init DB Fetch Error" in str(e):
            raise HTTPException(status_code=424, detail="The initial database fetch for the user information failed, failed dependency.")
        if "Unauthorized Access Key Error" in str(e):
            raise HTTPException(status_code=403, detail="Your Access Token does not allow access to this Well.")
        if "File id does not belong to provided Well." in str(e):
            raise HTTPException(status_code=400, detail="The provided File id does not belong to the provided Well id.")
        if "Assistant support at most 20 files, remove some files before adding new ones." in str(e):
            raise HTTPException(status_code=412, detail="The Well is already full, please remove files before adding new ones.")

        raise HTTPException(status_code=500, detail="Internal Server Error")