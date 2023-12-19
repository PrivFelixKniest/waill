from datetime import datetime
from typing import List
from typing import Optional
from sqlalchemy import Column, DateTime, func
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship


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
    name: Mapped[str]
    instructions: Mapped[str]
    model: Mapped[str]
    user_id: Mapped[int]
