from fastapi import APIRouter, HTTPException
from sqlmodel import select
from database import SessionDep
from membership.membership_model import Membership

router = APIRouter(prefix="/memberships", tags=["memberships"])

@router.post("/")
def create_membership(membership: Membership, session: SessionDep) -> Membership:
    session.add(membership)
    session.commit()
    session.refresh(membership)
    return membership

@router.get("/")
def list_memberships(session: SessionDep) -> list[Membership]:
    return session.exec(select(Membership)).all()

@router.get("/{membership_id}")
def get_membership(membership_id: int, session: SessionDep) -> Membership:
    membership = session.get(Membership, membership_id)
    if not membership:
        raise HTTPException(status_code=404, detail="Membership not found")
    return membership

@router.put("/{membership_id}")
def update_membership(membership_id: int, updated_data: Membership, session: SessionDep) -> Membership:
    membership = session.get(Membership, membership_id)
    if not membership:
        raise HTTPException(status_code=404, detail="Membership not found")
    data = updated_data.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(membership, key, value)
    session.add(membership)
    session.commit()
    session.refresh(membership)
    return membership

@router.delete("/{membership_id}")
def delete_membership(membership_id: int, session: SessionDep):
    membership = session.get(Membership, membership_id)
    if not membership:
        raise HTTPException(status_code=404, detail="Membership not found")
    session.delete(membership)
    session.commit()
    return {"message": "Membership deleted successfully"}