from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.expense import Expense
from app.schemas.expense_schema import ExpenseCreate

router = APIRouter()

# CREATE EXPENSE

@router.post("/expenses")
def create_expense(expense: ExpenseCreate):

    db: Session = SessionLocal()

    new_expense = Expense(
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
        trip_id=expense.trip_id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return {
        "message": "Expense added successfully",
        "expense_id": new_expense.id
    }


# GET ALL EXPENSES

@router.get("/expenses")
def get_expenses():

    db: Session = SessionLocal()

    expenses = db.query(Expense).all()

    return expenses


# DELETE EXPENSE

@router.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int):

    db: Session = SessionLocal()

    expense = db.query(Expense).filter(
        Expense.id == expense_id
    ).first()

    if not expense:
        return {
            "error": "Expense not found"
        }

    db.delete(expense)
    db.commit()

    return {
        "message": "Expense deleted successfully"
    }