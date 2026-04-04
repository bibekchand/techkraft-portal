## How to setup/run project?
First clone the project
```
git clone https://github.com/bibekchand/techkraft-portal
```
### Backend
```
cd backend
python -m venv ./
source bin/activate
pip install -r requirements.txt
fastapi dev main.py
```
API Docs:
Swagger UI: http://127.0.0.1:8000/docs
Backend is setup.

Now frontend
### Frontend
```
cd ..
cd frontend
npm install
npm run dev
```
Frontend server: http://localhost:5173


Note:
create some properties before checking out
