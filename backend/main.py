import uvicorn
from fastapi import FastAPI, Security
from fastapi.security import HTTPBearer
from utils import VerifyToken
from routers.query_document import router as query_document_router
from routers.user_information import router as user_information_router
from dotenv import load_dotenv


# Scheme for the Authorization header
token_auth_scheme = HTTPBearer()

load_dotenv()

app = FastAPI()
auth = VerifyToken()

app.include_router(query_document_router)
app.include_router(user_information_router)


@app.get("/")
def read_root():
    return {"Waill": "Server"}


@app.get("/ping")
def read_root():
    return "pong 🏓"


# new code 👇
@app.get("/private")
def private(auth_result = Security(auth.verify)):
    """A valid access token is required to access this route"""

    return auth_result


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
