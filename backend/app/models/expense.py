from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    amount = Column(Integer, nullable=False)
    category = Column(String)

    trip_id = Column(Integer, ForeignKey("trips.id"))