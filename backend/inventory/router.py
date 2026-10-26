from fastapi import APIRouter, HTTPException
from sqlmodel import select, col
from database import SessionDep
from inventory.product_model import Product
from inventory.sale_model import Sale
from inventory.schemas import AddStockRequest, SaleRequest

router = APIRouter(tags=["inventory"])


# ---------- PRODUCTS ----------

@router.get("/products/")
def list_products(session: SessionDep) -> list[Product]:
    return session.exec(
        select(Product).order_by(Product.category, Product.item, Product.size, Product.color)
    ).all()


@router.post("/products/add-stock")
def add_stock(data: AddStockRequest, session: SessionDep) -> Product:
    item = data.item.strip()
    size = data.size.strip()
    color = data.color.strip()

    if not item:
        raise HTTPException(status_code=400, detail="Choose an item.")
    if data.quantity < 1:
        raise HTTPException(status_code=400, detail="Quantity must be at least 1.")

    # Same item + size + color already exists? Add to it instead of making a duplicate.
    product = session.exec(
        select(Product).where(
            Product.category == data.category,
            Product.item == item,
            Product.size == size,
            Product.color == color,
        )
    ).first()

    if product:
        product.quantity += data.quantity
        if data.price > 0:
            product.price = data.price
        if data.cost > 0:
            product.cost = data.cost
    else:
        product = Product(
            category=data.category,
            item=item,
            size=size,
            color=color,
            quantity=data.quantity,
            price=data.price,
            cost=data.cost,
        )

    session.add(product)
    session.commit()
    session.refresh(product)
    return product


@router.delete("/products/{product_id}")
def delete_product(product_id: int, session: SessionDep):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    session.delete(product)
    session.commit()
    return {"message": "Product deleted successfully"}


# ---------- SALES ----------

@router.get("/sales/")
def list_sales(session: SessionDep) -> list[Sale]:
    return session.exec(select(Sale).order_by(col(Sale.sold_at).desc())).all()


@router.post("/sales/")
def create_sale(data: SaleRequest, session: SessionDep) -> Sale:
    product = session.get(Product, data.product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if data.quantity < 1:
        raise HTTPException(status_code=400, detail="Quantity must be at least 1.")
    if product.quantity < data.quantity:
        raise HTTPException(status_code=400, detail=f"Only {product.quantity} left in stock.")

    product.quantity -= data.quantity

    sale = Sale(
        product_id=product.id,
        item=product.item,
        size=product.size,
        color=product.color,
        quantity=data.quantity,
        unit_price=product.price,
        total=product.price * data.quantity,
    )

    session.add(product)
    session.add(sale)
    session.commit()  # stock goes down and the sale is saved together
    session.refresh(sale)
    return sale