# 💸 Smart Expense Splitter

A full-stack expense splitting web app where a group of users can add shared expenses, track who paid, and see exactly who owes what. Built with **Django REST Framework** + **React (Vite)**.

🌐 **Live Demo:** https://expense-splitter-maaa.onrender.com

---

## ✨ Features

### Core
- Add and manage users
- Create expenses with a single payer and multiple participants
- Automatically split expenses equally among participants
- View real-time balances — who owes money and who is owed
- Delete users and expenses
- Fully responsive UI with animated galaxy background

### API
- RESTful Django backend with DRF Browsable API
- CORS enabled for frontend-backend communication
- Clean JSON responses for all endpoints

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Axios |
| Backend | Django 6, Django REST Framework |
| Database | SQLite (dev) |
| Styling | Custom CSS with Glassmorphism + Animations |
| Fonts | Google Fonts — Poppins |
| Hosting | Render (backend), Vite dev server (frontend) |

---

## 📁 Folder Structure

```
expense-splitter/
├── backend/                   # Django project root
│   ├── backend/               # Project-level settings & urls
│   │   ├── settings.py
│   │   └── urls.py
│   └── expenses/              # App-level logic
│       ├── models.py          # User, Expense models
│       ├── serializers.py     # DRF serializers
│       ├── views.py           # ViewSets + balances endpoint
│       ├── urls.py            # API routes
│       └── admin.py           # Admin registration
│
└── expense-splitter-ui/       # React frontend (Vite)
    └── src/
        ├── components/
        │   ├── AddUser.jsx        # Manage users
        │   ├── ExpenseForm.jsx    # Add expense with paid_by + participants
        │   ├── ExpenseList.jsx    # View & delete expenses
        │   └── Balances.jsx       # View balances
        ├── App.jsx
        ├── main.jsx
        └── index.css
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/` | Get all users |
| POST | `/api/users/` | Add a user |
| DELETE | `/api/users/{id}/` | Delete a user |
| GET | `/api/expenses/` | Get all expenses |
| POST | `/api/expenses/` | Create an expense |
| DELETE | `/api/expenses/{id}/` | Delete an expense |
| GET | `/api/balances/` | View all user balances |

### POST `/api/expenses/` — Request Body

```json
{
  "title": "Dinner",
  "amount": 300,
  "paid_by": 1,
  "participants": [1, 2, 3]
}
```

---

## 👨‍💻 Core User Flow

**1. Add Users**
Visit the app → go to **Add User** → enter names → users are saved to the database.

**2. Add Expense**
Go to **Add Expense** → enter a title and total amount → select who paid → check the participants who are sharing the cost → submit.

**3. View Expenses**
Go to **All Expenses** → see every expense with its title and amount. Delete any expense if needed.

**4. Check Balances**
Go to **Balances** → see who is owed money (green) and who owes money (red), calculated automatically by splitting each expense equally among participants.

---

## 🗄️ Data Models

```
User
├── id (auto)
└── name

Expense
├── id (auto)
├── title
├── amount
├── paid_by (FK → User)
├── participants (M2M → User)
└── created_at
```

---

## ⚖️ Balance Calculation Logic

For each expense:
- Split amount = total amount ÷ number of participants
- Payer's balance increases by the full amount paid
- Each participant's balance decreases by their split share
- Positive balance → owed money (shown in green)
- Negative balance → owes money (shown in red)

---

## 🛠️ Local Development

### Backend

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

# Install dependencies
pip install django djangorestframework django-cors-headers

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start server
python manage.py runserver
```

Backend runs at: `http://127.0.0.1:8000`

### Frontend

```bash
# Navigate to frontend
cd expense-splitter-ui

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🌍 Environment

No environment variables required for local development. The frontend API base URL points to the deployed Render backend by default. To switch to your local backend, update the `axios` base URLs in each component from:

```
https://expense-splitter-maaa.onrender.com/api/
```
to:
```
http://127.0.0.1:8000/api/
```

---

## 💰 Cost

Runs entirely on free tiers — **$0/month**.

- Backend hosted on Render free tier
- SQLite requires no external database
- No third-party paid services

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome. Feel free to open an issue or submit a pull request.

---

## 📄 License

MIT License
