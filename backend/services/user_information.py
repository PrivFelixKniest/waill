from fastapi import HTTPException

from db.database import DB_Session
from db.database_schemas import User
from routers.auth_schema import VerifySchema
from routers.user_information_schemas import PostKeySchema


def get_user(_auth_result: VerifySchema):
    try:
        with DB_Session.begin() as db:
            try:
                user = db.query(User).where(User.auth0_user_id == _auth_result["sub"]).first()
            except Exception:
                raise HTTPException(status_code=424, detail="The initial database fetch for the user information failed, failed dependency.")

            if user is None:
                new_user = User(auth0_user_id=_auth_result["sub"], openai_api_key="")
                db.add(new_user)
                db.flush()
                # updating user from db
                user = db.query(User).where(User.auth0_user_id == _auth_result["sub"]).first()
            return {"id": user.id, "auth0_user_id": user.auth0_user_id, "openai_api_key": user.openai_api_key, "created_at": user.created_at, "updated_at": user.updated_at}
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


def post_key(key_body: PostKeySchema, _auth_result: VerifySchema):
    try:
        with DB_Session.begin() as db:
            try:
                user = db.query(User).where(User.auth0_user_id == _auth_result["sub"]).first()
            except Exception:
                raise HTTPException(status_code=424, detail="The initial database fetch for the user information failed, failed dependency.")

            if user is None:
                new_user = User(auth0_user_id=_auth_result["sub"], openai_api_key=key_body.openai_key)
                db.add(new_user)
                db.flush()
            else:
                user.openai_api_key = key_body.openai_key
                db.flush()
            # updating user from db
            user = db.query(User).where(User.auth0_user_id == _auth_result["sub"]).first()
            return {"id": user.id, "auth0_user_id": user.auth0_user_id, "openai_api_key": user.openai_api_key, "created_at": user.created_at, "updated_at": user.updated_at}
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")