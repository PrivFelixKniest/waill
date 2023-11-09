from fastapi import FastAPI
from routers.query_document import router as query_document_router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.include_router(query_document_router)


@app.get("/")
def read_root():
    return {"Waill": "Server"}


@app.get("/ping")
def read_root():
    return "pong 🏓"
