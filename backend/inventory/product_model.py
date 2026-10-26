from typing import Optional
from sqlmodel import SQLModel, Field

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    category: str  # "Merch" or "Supply"
    item: str  # "Kids Gi", "Rashguard", "Mat Tape"
    size: str = ""  # "M1", "L", or "" when there's no size
    color: str = ""  # "White", "Black", or "" when there's no color
    price: float = 0  # what the customer pays (each)
    cost: float = 0  # what the gym paid (each)
    quantity: int = 0  # how many are in stock
    low_stock_at: int = 3  # show a warning at or below this number