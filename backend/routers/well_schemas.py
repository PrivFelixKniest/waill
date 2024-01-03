from typing import List

from pydantic import BaseModel, Field
from datetime import datetime

from routers.query_documents_schemas import MessageResponse


class PostWellSchema(BaseModel):
    name: str = Field(..., title="Well Name")
    instructions: str = Field(..., title="Instructions for the assistant")
    model: str = Field(..., title="Which model should the ai use?")
    openai_api_key: str = Field(..., title="Openai key that this Well should exist on.")


class PostWellResponse(BaseModel):
    id: int = Field(..., title="Well unique ID")
    name: str = Field(..., title="Well Name")
    instructions: str = Field(..., title="Instructions for the assistant")
    model: str = Field(..., title="Which model should the ai use?")
    user_id: int = Field(..., title="Id of the user the well belongs to")
    messages: List[MessageResponse] = Field(..., title="Messages in this Well")
    created_at: datetime = Field(..., title="Created At")
    updated_at: datetime = Field(..., title="Updated At")


class DeleteWellSchema(BaseModel):
    id: int = Field(..., title="Well unique ID")