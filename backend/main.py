from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_db_and_tables
from routers import health
from students.router import router as students_router
from students import student_model, parent_model
from waivers.router import router as waivers_router
from waivers import waiver_model
from membership.router import router as membership_router
from membership import membership_model


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(students_router)
app.include_router(waivers_router)
app.include_router(membership_router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()