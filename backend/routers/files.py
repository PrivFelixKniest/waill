from typing import List

from fastapi import APIRouter, Security, UploadFile
import os

from routers.auth_schema import VerifySchema
from routers.files_schemas import PostFileResponse
from services.files import post_upload_file, get_files, delete_file
from utils import VerifyToken
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
auth = VerifyToken()


@router.post("/well/{well_id}/upload-file", response_model=PostFileResponse)
async def post_upload_file_route(well_id: int, upload_file: UploadFile, _auth_result: VerifySchema = Security(auth.verify)):
    return post_upload_file(well_id=well_id, upload_file=upload_file, _auth_result=_auth_result)


@router.get("/well/{well_id}/files", response_model=List[PostFileResponse])
async def get_files_route(well_id: int, _auth_result: VerifySchema = Security(auth.verify)):
    return get_files(well_id=well_id, _auth_result=_auth_result)


@router.delete("/well/{well_id}/file/{file_id}", response_model=PostFileResponse)
async def delete_file_route(well_id: int, file_id: int, _auth_result: VerifySchema = Security(auth.verify)):
    return delete_file(well_id=well_id, file_id=file_id, _auth_result=_auth_result)
