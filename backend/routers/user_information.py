from fastapi import APIRouter, Security

from routers.auth_schema import VerifySchema
from routers.user_information_schemas import PostKeySchema, PostKeyResponse, GetUserResponse
from services.user_information import post_key, get_user
from utils import VerifyToken

router = APIRouter()
auth = VerifyToken()


@router.get("/user", response_model=GetUserResponse)
def post_key_route(_auth_result: VerifySchema = Security(auth.verify)):
    return get_user(_auth_result=_auth_result)


@router.post("/user/openai-key", response_model=PostKeyResponse)
def post_key_route(key_body: PostKeySchema, _auth_result: VerifySchema = Security(auth.verify)):
    return post_key(key_body=key_body, _auth_result=_auth_result)
