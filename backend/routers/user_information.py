from fastapi import APIRouter, Security

from db.database import supabase
from routers.user_information_schemas import GetUserResponse, GetUserSchema
from utils import VerifyToken


from services.query_document import get_query_answer

router = APIRouter()
auth = VerifyToken()


@router.get("/user/{auth0_user_id}")
def read_root(auth0_user_id: str, auth_result = Security(auth.verify)):
    data, count = supabase.table("user").select("*").eq("auth0_user_id", auth0_user_id).execute()
    # response = supabase.table("user").select("*").execute()
    # data, count = supabase.table("user").insert({"auth0_user_id": user.user_id})
    return {"data": data, "count": count}