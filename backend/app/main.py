from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.database import engine, Base

from app.models.user import User
from app.models.trip import Trip
from app.models.expense import Expense

from app.routes.user_routes import router as user_router
from app.routes.trip_routes import router as trip_router
from app.routes.expense_routes import router as expense_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(trip_router)
app.include_router(expense_router)

@app.get("/")
def root():
    return {"message": "Traveloop API Running"}