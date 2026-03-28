from fastapi import FastAPI, Depends, HTTPException, status
from datetime import datetime, timedelta, timezone
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Field, Session, SQLModel, create_engine, select
import jwt
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
from pydantic import BaseModel, EmailStr
from pwdlib import PasswordHash

SECRET_KEY = "f133813277fbfcad6f41ced756c52776fa6505a5c3078b60754d4aa5cc03ade3"


class Token(BaseModel):
    access_token: str
    token_type: str


ALGORITHM = "HS256"
auth = OAuth2PasswordBearer(tokenUrl="login")

password_hash = PasswordHash.recommended()
app = FastAPI()
sqlite_url = "sqlite:///database.db"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def create_db_tables():
    SQLModel.metadata.create_all(engine)


@app.on_event("startup")
def on_startup():
    create_db_tables()


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


class UserTable(SQLModel, table=True):
    email: str = Field(primary_key=True)
    password: str


def verifyUserFromDatabase(user: UserLogin, session: SessionDep):
    user_db = session.get(UserTable, user.email)
    if not user_db:
        return False
    if not password_hash.verify(user.password, user_db.password):
        return False
    return user


def handleAuthentication(token, session):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise credentials_exception
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="token expired")
    user = session.get(UserTable, email)
    if not user:
        raise credentials_exception
    return user


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


@app.get("/get_current_user")
def get_current_user(token: Annotated[str, Depends(auth)], session: SessionDep):
    user = handleAuthentication(token, session)
    if user:
        return user


@app.post("/sign_up")
def sign_up(user_form: UserCreate, session: SessionDep):
    db_user = UserTable(**user_form.model_dump())
    exists = session.get(UserTable, db_user.email)
    if not exists:
        db_user.password = password_hash.hash(db_user.password)
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
    else:
        raise HTTPException(status_code=409, detail="Username already taken")
    return {"message": "Account created successfully"}


@app.post("/login")
def login(user_form: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep) -> Token:
    user = UserLogin(email=user_form.username, password=user_form.password)
    validated = verifyUserFromDatabase(user, session)
    if not validated:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token = create_access_token(data={"sub": user.email})
    return Token(access_token=access_token, token_type="bearer")
