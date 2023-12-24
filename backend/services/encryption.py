from cryptography.fernet import Fernet
from dotenv import load_dotenv

import os

load_dotenv()

key = os.getenv("DATABASE_ENCRYPTION_KEY").encode()


def encrypt(message: str) -> str:
    fernet = Fernet(key)
    return fernet.encrypt(message.encode()).decode()


def decrypt(enc_message: str) -> str:
    fernet = Fernet(key)
    return fernet.decrypt(enc_message.encode()).decode()
