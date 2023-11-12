from pydantic import BaseModel, Field


class GetUserSchema(BaseModel):
    auth0_user_id: str = Field(..., title="User Id fetched from auth0")


class GetUserResponse(BaseModel):
    answer: str = Field(..., title="Query Response")