from typing import List, Optional

from pydantic import BaseModel, Field
from datetime import datetime

from db.database_schemas import Creator


class QuerySchema(BaseModel):
    question: str = Field(..., title="Query Question")


class MessageResponse(BaseModel):
    id: Optional[int] = Field(None, title="Message id from DB")
    content: str = Field(..., title="Query Response")
    message_index: Optional[int] = Field(None, title="Index of the message in the conversation")
    created_at: datetime = Field(..., title="Created at")
    creator: Creator = Field(..., title="creator of the message")


class RunsResponse(BaseModel):
    run_id: str = Field(..., title="Id of the current run")
    model: str = Field(..., title="Model of the Run")
    instructions: str = Field(..., title="Instructions of the Run")
    file_ids: List[str] = Field(..., title="File IDs passed in by the assistant")
    run_status: str = Field(..., title="Status")
    last_error: Optional[str] = Field(None, title="Last Error of the run in the OpenAI client, if failed")
    response: Optional[MessageResponse] = Field(None, title="Assistant answer, if successful")
