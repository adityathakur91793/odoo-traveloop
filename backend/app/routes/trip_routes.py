from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.trip import Trip
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