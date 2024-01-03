from sqlalchemy import Column, DateTime, func
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from enum import Enum


class Base(DeclarativeBase):
    pass


class BaseModel:
    """
    Reusable columns
    """
    created_at = Column(DateTime, nullable=False, default=func.current_timestamp())
    updated_at = Column(DateTime, nullable=False, default=func.current_timestamp(), onupdate=func.current_timestamp())


class User(Base, BaseModel):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    auth0_user_id: Mapped[str]
    openai_api_key: Mapped[str]


class Well(Base, BaseModel):
    __tablename__ = "well"
    id: Mapped[int] = mapped_column(primary_key=True)
    assistant_id: Mapped[str]
    thread_id: Mapped[str]
    name: Mapped[str]
    instructions: Mapped[str]
    openai_api_key: Mapped[str]
    model: Mapped[str]
    user_id: Mapped[int]


class Creator(str, Enum):
    assistant = 'assistant'
    user = 'user'


class Message(Base, BaseModel):
    __tablename__ = "message"
    id: Mapped[int] = mapped_column(primary_key=True)
    well_id: Mapped[int]
    message_id: Mapped[str]
    message_index: Mapped[int]
    creator: Mapped[Creator]
    content: Mapped[str]


class File(Base, BaseModel):
    __tablename__ = "file"
    id: Mapped[int] = mapped_column(primary_key=True)
    well_id: Mapped[int]
    file_id: Mapped[str]
    file_name: Mapped[str]
    file_type: Mapped[str]
