from fastapi import APIRouter, HTTPException
from sqlmodel import select
from database import SessionDep
from waivers.waiver_model import Waiver

router = APIRouter(prefix="/waivers", tags=["waivers"])

@router.post("/")
def create_waiver(waiver: Waiver, session: SessionDep) -> Waiver:
    session.add(waiver)
    session.commit()
    session.refresh(waiver)
    return waiver

@router.get("/")
def list_waivers(session: SessionDep) -> list[Waiver]:
    return session.exec(select(Waiver)).all()

@router.get("/{waiver_id}")
def get_waiver(waiver_id: int, session: SessionDep) -> Waiver:
    waiver = session.get(Waiver, waiver_id)
    if not waiver:
        raise HTTPException(status_code=404, detail="Waiver not found")
    return waiver

@router.delete("/{waiver_id}")
def delete_waiver(waiver_id: int, session: SessionDep):
    waiver = session.get(Waiver, waiver_id)
    if not waiver:
        raise HTTPException(status_code=404, detail="Waiver not found")
    session.delete(waiver)
    session.commit()
    return {"message": "Waiver deleted successfully"}