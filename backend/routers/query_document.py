from fastapi import APIRouter, Security
import os
from utils import VerifyToken

from routers.query_documents_schemas import QuerySchema, QueryResponse
from services.query_document import get_query_answer

router = APIRouter()
auth = VerifyToken()


@router.post("/query", response_model=QueryResponse)
def read_root(query: QuerySchema, auth_result = Security(auth.verify)):
    return get_query_answer(query)