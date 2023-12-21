from pydantic import BaseModel, Field
from datetime import datetime


class GetUserResponse(BaseModel):
    id: int = Field(..., title="user id")
    auth0_user_id: str = Field(..., title="User Id fetched from auth0")
    openai_api_key: str = Field(..., title="Openai api key")
    created_at: datetime = Field(..., title="Created At of the column")
    updated_at: datetime = Field(..., title="Updated At of the column")


class PostKeySchema(BaseModel):
    openai_key: str = Field(..., title="Openai API Key")


class PostKeyResponse(BaseModel):
    id: int = Field(..., title="user id")
    auth0_user_id: str = Field(..., title="User Id fetched from auth0")
    openai_api_key: str = Field(..., title="Openai api key")
    created_at: datetime = Field(..., title="Created At of the column")
    updated_at: datetime = Field(..., title="Updated At of the column")
