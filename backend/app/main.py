from fastapi import FastAPI
from app.database import engine, Base
from app.models.user import User
from app.routes.user_routes import router as user_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_router)

@app.get("/")
def root():
    return {"message": "Traveloop API Running"}