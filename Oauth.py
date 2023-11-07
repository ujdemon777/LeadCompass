from datetime import timedelta, datetime

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from models.model import User
from models import schema
from config.db import Database


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')

SECRET_KEY = "732ed638d14bffa82421bfff6be54fbd026279754f166eff3154bce56fee0891"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


database = Database()
engine = database.get_db_connection()
session = database.get_db_session(engine)

    

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"expire": expire.strftime("%Y-%m-%d %H:%M:%S")})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)

    return encoded_jwt

def verify_token_access(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)

        id: str = payload.get("user_id")
        print(id,payload)
        if id is None:
            raise credentials_exception
        # token_data = schema.DataToken(id)
    except JWTError as e:
        print(e)
        raise credentials_exception

    return payload

def get_current_user(token: str = Depends(oauth2_scheme)):
    
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                          detail="Could not Validate Credentials",
                                          headers={"WWW-Authenticate": "Bearer"})

    token = verify_token_access(token, credentials_exception)
    print(token)

    user = session.query(User).filter(User.id == token.get('user_id')).first()

    return user