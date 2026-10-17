from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field

class Waiver(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="student.id")
    waiver_type: str  # "liability", "medical", "membership_agreement"
    signed_by: str  # typed full name = the signature
    signed_at: datetime = Field(default_factory=datetime.utcnow)