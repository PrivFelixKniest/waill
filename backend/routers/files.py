from fastapi import APIRouter, Security, UploadFile
import os

from routers.auth_schema import VerifySchema
from routers.well_schemas import PostWellResponse
from services.files import post_upload_file
from utils import VerifyToken
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
auth = VerifyToken()


@router.post("/well/{well_id}/upload-file", response_model=PostWellResponse)
async def post_upload_file_route(well_id: int, upload_file: UploadFile, _auth_result: VerifySchema = Security(auth.verify)):
    return post_upload_file(well_id=well_id, upload_file=upload_file, _auth_result=_auth_result)