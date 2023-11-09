from fastapi import APIRouter
import os

router = APIRouter()


@router.get("/query")
def read_root():
    return {"query": "answer"}