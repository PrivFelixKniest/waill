from fastapi import APIRouter, Security, BackgroundTasks
from utils import VerifyToken

from routers.query_documents_schemas import QuerySchema, RunsResponse
from services.query_document import post_message, save_response_to_db, get_run_and_response

router = APIRouter()
auth = VerifyToken()


@router.post("/well/{well_id}/query", response_model=RunsResponse)
async def post_message_route(well_id: int,
                             query: QuerySchema,
                             background_tasks: BackgroundTasks,
                             _auth_result = Security(auth.verify)):
    response = post_message(well_id, query, _auth_result)
    # after return make sure to save the response to the database! Async fetch run status will not write to db
    background_tasks.add_task(save_response_to_db,
                              run_id=response["run_id"],
                              well_id=well_id,
                              _auth_result=_auth_result)
    return response


@router.get("/well/{well_id}/run/{run_id}", response_model=RunsResponse)
def get_run_and_response_route(well_id: int, run_id: str, _auth_result= Security(auth.verify)):
    return get_run_and_response(run_id=run_id, well_id=well_id, _auth_result=_auth_result)
