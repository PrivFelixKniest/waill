from fastapi import APIRouter, Security, HTTPException

from db.database import DB_Session
from db.database_schemas import User
from routers.user_information_schemas import GetUserResponse
from utils import VerifyToken

router = APIRouter()
auth = VerifyToken()


@router.get("/user/{auth0_user_id}", response_model=GetUserResponse)
def read_root(auth0_user_id: str, _auth_result = Security(auth.verify)):
    with DB_Session.begin() as db:
        user = db.query(User).where(User.auth0_user_id == auth0_user_id).first()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return {"id": user.id, "auth0_user_id": user.auth0_user_id, "openai_api_key": user.openai_api_key, "created_at": user.created_at, "updated_at": user.updated_at}
