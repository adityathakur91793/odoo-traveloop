# Traveloop Dashboard

Traveloop Dashboard is a full-stack travel expense management web application built for hackathon submission.

It allows users to manage trip budgets, track expenses, visualize spending analytics, and monitor remaining budget in real time.

---

# Features

## Expense Management
- Add expenses
- Delete expenses
- Real-time updates

## Budget Tracking
- Total trip budget
- Total spent amount
- Remaining budget calculation
- Budget usage progress bar

## Analytics Dashboard
- Interactive pie chart
- Category-wise spending visualization
- Dynamic updates

## Responsive UI
- Mobile responsive layout
- Modern dashboard interface
- Clean card-based design

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- Recharts

## Backend
- FastAPI
- SQLAlchemy
- SQLite

---

# Project Structure

```bash
traveloop/
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── models/
│   ├── schemas/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# Backend Setup

```bash
cd backend

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /expenses | Get all expenses |
| POST | /expenses | Add expense |
| DELETE | /expenses/{id} | Delete expense |
| GET | /trips/1/budget | Budget analytics |

---

# Hackathon Highlights

- Full-stack architecture
- REST API integration
- Dynamic analytics dashboard
- Real-time expense tracking
- Responsive design
- Database persistence

