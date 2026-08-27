from typing import Optional
from sqlmodel import SQLModel, Field

class Parent (SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    email: str
    phone: str

class Student (SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    date_of_birth: str
    belt_rank: Optional[str] = "White"
    parent_id: Optional[int] = Field(default=None, foreign_key="parent.id")