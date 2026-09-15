from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field

class Waiver(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="student.id")
    waiver_type: str  # "liability", "photo_release", "medical", "membership_agreement"
    signed_by: str  # name of parent/guardian or adult student
    signature: str  # typed name for now; real e-signature capture comes later
    signed_at: datetime = Field(default_factory=datetime.utcnow)