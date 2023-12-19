from pydantic import BaseModel, Field


class GetUserResponse(BaseModel):
    id: str = Field(..., title="user id")
    auth0_user_id: str = Field(..., title="User Id fetched from auth0")
    openai_api_key: str = Field(..., title="Openai api key")
    created_at: str = Field(..., title="Created At of the column")
    updated_at: str = Field(..., title="Updated At of the column")