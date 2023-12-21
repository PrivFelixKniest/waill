from fastapi import APIRouter, Security
import os
from typing import List

from routers.well_schemas import PostWellSchema, PostWellResponse, DeleteWellSchema
from services.well import post_well, delete_well, get_well
from utils import VerifyToken
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
auth = VerifyToken()


@router.post("/well", response_model=PostWellResponse)
def post_well_route(well: PostWellSchema, _auth_result = Security(auth.verify)):
    return post_well(well=well, _auth_result=_auth_result)


@router.delete("/well", response_model=PostWellResponse)
def delete_well_route(well_reference: DeleteWellSchema, _auth_result = Security(auth.verify)):
    return delete_well(well_id=well_reference.id, _auth_result=_auth_result)


@router.get("/well", response_model=List[PostWellResponse])
def get_well_route(_auth_result = Security(auth.verify)):
    return get_well(_auth_result=_auth_result)