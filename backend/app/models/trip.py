from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    start_date = Column(String)
    end_date = Column(String)
    budget = Column(Integer)

    user_id = Column(Integer, ForeignKey("users.id"))