from pydantic import BaseModel, Field
from typing import List


class VerifySchema(BaseModel):
    iss: str = Field(..., title="Auth URL")
    sub: str = Field(..., title="User ID")
    aud: List[str] = Field(..., title="Token Audiences")
    iat: int = Field(..., title="Issue Timestamp?")
    exp: int = Field(..., title="Expiring Timestamp")
    azp: str = Field(..., title="?")
    scope: str = Field(..., title="Scope")

