from fastapi import APIRouter, HTTPException
from sqlmodel import select
from database import SessionDep
from students.student_model import Student

router = APIRouter(prefix="/students", tags=["students"])

@router.post("/")
def create_student(student: Student, session: SessionDep) -> Student:
    session.add(student)
    session.commit()
    session.refresh(student)
    return student

@router.get("/")
def list_students(session: SessionDep) -> list[Student]:
    students = session.exec(select(Student)).all()
    return students

@router.get("/{student_id}")
def get_student(student_id: int, session: SessionDep) -> Student:
    student = session.get(Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.put("/{student_id}")
def update_student(student_id: int, updated_data: Student, session: SessionDep) -> Student:
    student = session.get(Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    student_data = updated_data.model_dump(exclude_unset=True)
    for key, value in student_data.items():
        setattr(student, key, value)

    session.add(student)
    session.commit()
    session.refresh(student)
    return student

@router.delete("/{student_id}")
def delete_student(student_id: int, session: SessionDep):
    student = session.get(Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    session.delete(student)
    session.commit()
    return {"message": "Student deleted successfully"}