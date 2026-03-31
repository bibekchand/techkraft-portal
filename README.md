```markdown
# Full Stack Web App (FastAPI + React)

This is a full-stack web application consisting of a **FastAPI backend** and a **React frontend**. The backend provides REST APIs, while the frontend interacts with these APIs to deliver the user interface.

---

## 📁 Project Structure

```

project-root/
│
├── backend/
│   ├── requirements.txt
│   ├── main.py (or app/)
│   └── ...
│
├── frontend/
│   ├── package.json
│   ├── src/
│   └── ...
│
└── README.md

````

---

## ⚙️ Backend (FastAPI)

### Setup

```bash
cd backend

python -m venv venv

# Activate virtual environment
# Mac/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

pip install -r requirements.txt
````

### Run Server

```bash
uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

API docs:

* Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* ReDoc: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## 🎨 Frontend (React)

### Setup

```bash
cd frontend
npm install
```

### Run App

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🔗 Connecting Frontend to Backend

Update your API base URL in the frontend:

```js
const baseURL = "http://127.0.0.1:8000";
```

---

## 🔐 Authentication

* Uses token-based authentication (e.g., JWT)
* Token is stored in `localStorage`
* Sent in request headers:

```js
Authorization: Bearer <token>
```

---

## 🧪 Features

* User authentication (login/signup)
* Add/remove favorites
* Fetch user-specific data
* REST API integration between frontend and backend

---

## 🛠️ Tech Stack

**Backend:**

* FastAPI
* SQLModel / SQLAlchemy
* SQLite / PostgreSQL
* Uvicorn

**Frontend:**

* React
* Axios
* Vite / Create React App

---

## 📌 Notes

* Make sure the backend is running before starting the frontend.
* Enable CORS in FastAPI if frontend and backend run on different ports.
* Do not commit sensitive data (tokens, secrets, `.env` files).

```
```

