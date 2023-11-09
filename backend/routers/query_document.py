from fastapi import APIRouter
import os

from routers.query_documents_schemas import QuerySchema, QueryResponse
from services.query_document import get_query_answer

router = APIRouter()


@router.post("/query", response_model=QueryResponse)
def read_root(query: QuerySchema):
    return get_query_answer(query)