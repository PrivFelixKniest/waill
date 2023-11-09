from pydantic import BaseModel, Field


class QuerySchema(BaseModel):
    question: str = Field(..., title="Query Question")


class QueryResponse(BaseModel):
    answer: str = Field(..., title="Query Response")