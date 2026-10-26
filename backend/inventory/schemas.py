from pydantic import BaseModel

class AddStockRequest(BaseModel):
    category: str
    item: str
    size: str = ""
    color: str = ""
    quantity: int
    cost: float = 0
    price: float = 0

class SaleRequest(BaseModel):
    product_id: int
    quantity: int = 1