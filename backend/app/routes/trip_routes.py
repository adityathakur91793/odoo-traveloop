from fastapi import APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import SessionLocal
from app.models.trip import Trip
from app.models.expense import Expense
from app.schemas.trip_schema import TripCreate

router = APIRouter()


@router.post("/trips")
def create_trip(trip: TripCreate):

    db: Session = SessionLocal()

    new_trip = Trip(
        title=trip.title,
        description=trip.description,
        start_date=trip.start_date,
        end_date=trip.end_date,
        budget=trip.budget,
        user_id=trip.user_id
    )

    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)

    return {
        "message": "Trip created successfully",
        "trip_id": new_trip.id
    }


@router.get("/trips")
def get_trips():

    db: Session = SessionLocal()

    trips = db.query(Trip).all()

    return trips


@router.get("/trips/{trip_id}/budget")
def trip_budget_summary(trip_id: int):

    db: Session = SessionLocal()

    trip = db.query(Trip).filter(Trip.id == trip_id).first()

    total_spent = db.query(
        func.sum(Expense.amount)
    ).filter(
        Expense.trip_id == trip_id
    ).scalar()

    if total_spent is None:
        total_spent = 0

    remaining_budget = trip.budget - total_spent

    return {
        "trip_budget": trip.budget,
        "total_spent": total_spent,
        "remaining_budget": remaining_budget
    }