from pydantic import BaseModel

class TripCreate(BaseModel):
    title: str
    description: str
    start_date: str
    end_date: str
    budget: int
    user_id: int