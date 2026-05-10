from pydantic import BaseModel

class ExpenseCreate(BaseModel):
    title: str
    amount: int
    category: str
    trip_id: int