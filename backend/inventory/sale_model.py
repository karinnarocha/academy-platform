from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field

class Sale(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: int  # which product was sold
    # A copy of the product details, so the history stays correct
    # even if the product is edited or deleted later
    item: str
    size: str = ""
    color: str = ""
    quantity: int
    unit_price: float
    total: float
    sold_at: datetime = Field(default_factory=datetime.utcnow)