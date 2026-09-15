from typing import Optional
from datetime import date
from sqlmodel import SQLModel, Field

class Membership(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="student.id")
    plan_name: str  # e.g. "Monthly Unlimited"
    monthly_amount: float
    start_date: date
    billing_day: int  # day of month payment is due
    stripe_customer_id: Optional[str] = None  # Stripe's token, never a real card number
    status: str = "active"  # "active", "frozen", "cancelled"