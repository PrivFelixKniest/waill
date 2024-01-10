from fastapi import HTTPException

from db.database import DB_Session
from db.database_schemas import User
from routers.auth_schema import VerifySchema
from routers.user_information_schemas import PostKeySchema
from services.encryption import encrypt, decrypt


def get_user(_auth_result: VerifySchema):
    try:
        with DB_Session.begin() as db:
            print("Start Fetch")
            # Fetch User
            try:
                user = db.query(User).where(User.auth0_user_id == _auth_result["sub"]).first()
            except Exception:
                raise Exception("Init DB Fetch Error")

            print("Check User")
            if user is None:
                print("Create User")
                new_user = User(auth0_user_id=_auth_result["sub"], openai_api_key=encrypt(""))
                db.add(new_user)
                db.flush()
                # updating user from db
                user = db.query(User).where(User.auth0_user_id == _auth_result["sub"]).first()
            print("Return User")
            print("userid" + str(user.id))
            print("auth0 user" + user.auth0_user_id)
            print("openai key" + decrypt(user.openai_api_key))
            return {"id": user.id, "auth0_user_id": user.auth0_user_id, "openai_api_key": decrypt(user.openai_api_key), "created_at": user.created_at, "updated_at": user.updated_at}
    except Exception as e:
        print("Error:" + str(e))
        if "Init DB Fetch Error" in str(e):
            raise HTTPException(status_code=424,
                                detail="The initial database fetch for the user information failed, failed dependency.")
        raise HTTPException(status_code=500, detail="Internal Server Error")


def post_key(key_body: PostKeySchema, _auth_result: VerifySchema):
    try:
        with DB_Session.begin() as db:
            # Fetch User
            try:
                user = db.query(User).where(User.auth0_user_id == _auth_result["sub"]).first()
            except Exception:
                raise Exception("Init DB Fetch Error")

            if user is None:
                new_user = User(auth0_user_id=_auth_result["sub"], openai_api_key=encrypt(key_body.openai_key))
                db.add(new_user)
                db.flush()
            else:
                user.openai_api_key = encrypt(key_body.openai_key)
                db.flush()
            # updating user from db
            user = db.query(User).where(User.auth0_user_id == _auth_result["sub"]).first()
            return {"id": user.id, "auth0_user_id": user.auth0_user_id, "openai_api_key": decrypt(user.openai_api_key), "created_at": user.created_at, "updated_at": user.updated_at}
    except Exception as e:
        if "Init DB Fetch Error" in str(e):
            raise HTTPException(status_code=424,
                                detail="The initial database fetch for the user information failed, failed dependency.")

        raise HTTPException(status_code=500, detail="Internal Server Error")