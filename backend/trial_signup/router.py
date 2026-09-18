from fastapi import APIRouter
from database import SessionDep
from students.parent_model import Parent
from students.student_model import Student
from waivers.waiver_model import Waiver
from trial_signup.schemas import TrialSignupRequest

router = APIRouter(prefix="/trial-signup", tags=["trial-signup"])

@router.post("/")
def create_trial_signup(data: TrialSignupRequest, session: SessionDep):

    if data.signup_type == "self":
        student = Student(
            first_name=data.parent_first_name,
            last_name=data.parent_last_name,
            date_of_birth=data.date_of_birth,
            belt_rank="White",
            parent_id=None,
        )
        session.add(student)
        session.commit()
        session.refresh(student)

        waiver = Waiver(
            student_id=student.id,
            waiver_type="liability",
            signed_by=data.signed_by,
            signature=data.signature,
        )
        session.add(waiver)
        session.commit()
        session.refresh(waiver)

        return {"students": [student]}

    parent = Parent(
        first_name=data.parent_first_name,
        last_name=data.parent_last_name,
        email=data.parent_email,
        phone=data.parent_phone,
    )
    session.add(parent)
    session.commit()
    session.refresh(parent)

    created_students = []

    for child in data.children:
        student = Student(
            first_name=child.first_name,
            last_name=child.last_name,
            date_of_birth=child.date_of_birth,
            belt_rank=child.belt_rank,
            parent_id=parent.id,
        )
        session.add(student)
        session.commit()
        session.refresh(student)

        waiver = Waiver(
            student_id=student.id,
            waiver_type="liability",
            signed_by=data.signed_by,
            signature=data.signature,
        )
        session.add(waiver)
        session.commit()
        session.refresh(waiver)

        created_students.append(student)

    return {"parent": parent, "students": created_students}