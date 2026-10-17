from fastapi import APIRouter, HTTPException
from database import SessionDep
from students.parent_model import Parent
from students.student_model import Student
from waivers.waiver_model import Waiver
from trial_signup.schemas import TrialSignupRequest, ChildInput

router = APIRouter(prefix="/trial-signup", tags=["trial-signup"])

@router.post("/")
def create_trial_signup(data: TrialSignupRequest, session: SessionDep):

    # 1. Check the basics before saving anything
    if not data.agreed:
        raise HTTPException(status_code=400, detail="You must agree to the waiver.")
    if not data.signed_by.strip():
        raise HTTPException(status_code=400, detail="Please type your full name to sign.")

    # 2. Build the list of people training (yourself OR your kids)
    if data.signup_type == "self":
        people = [ChildInput(
            first_name=data.parent_first_name,
            last_name=data.parent_last_name,
            date_of_birth=data.date_of_birth or "",
        )]
    else:
        people = data.children

    if not people:
        raise HTTPException(status_code=400, detail="Add at least one child.")
    for person in people:
        if not person.first_name.strip() or not person.date_of_birth:
            raise HTTPException(status_code=400, detail="Each person needs a first name and date of birth.")

    # 3. Contact person (parent, or the adult signing up for themselves)
    parent = Parent(
        first_name=data.parent_first_name,
        last_name=data.parent_last_name,
        email=data.parent_email,
        phone=data.parent_phone,
    )
    session.add(parent)
    session.flush()  # gives parent.id without saving yet

    # 4. One student + one waiver per person
    students = []
    for person in people:
        student = Student(
            first_name=person.first_name,
            last_name=person.last_name,
            date_of_birth=person.date_of_birth,
            belt_rank=person.belt_rank or "White",
            parent_id=parent.id,
        )
        session.add(student)
        session.flush()  # gives student.id

        session.add(Waiver(
            student_id=student.id,
            waiver_type="liability",
            signed_by=data.signed_by.strip(),
        ))
        students.append(student)

    # 5. Save everything together, or nothing if something failed
    session.commit()
    session.refresh(parent)
    for student in students:
        session.refresh(student)

    return {"parent": parent, "students": students}