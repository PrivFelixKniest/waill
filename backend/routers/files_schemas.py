from pydantic import BaseModel, Field
from datetime import datetime


class PostFileResponse(BaseModel):
    id: int = Field(..., title="File ID")
    file_name: str = Field(..., title="file name")
    file_type: str = Field(..., title="file type")
    created_at: datetime = Field(..., title="created at")
    updated_at: datetime = Field(..., title="updated at")