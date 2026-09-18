from typing import Optional
from pydantic import BaseModel

class ChildInput(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: str
    belt_rank: Optional[str] = "White"

class TrialSignupRequest(BaseModel):
    signup_type: str  # "self" or "child"
    parent_first_name: str
    parent_last_name: str
    parent_email: str
    parent_phone: str
    date_of_birth: Optional[str] = None  # used only when signup_type == "self"
    children: list[ChildInput] = []       # used only when signup_type == "child"
    signed_by: str
    signature: str