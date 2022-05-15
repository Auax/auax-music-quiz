import os
import secrets

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi_sqlalchemy import DBSessionMiddleware, db
from sqlalchemy.orm import Session
from starlette import status
from starlette.middleware.sessions import SessionMiddleware

from app.config import settings
from app.database.models.modes import Mode
from app.database.respository.modes import create_new_mode
from app.database.schemas.modes import ModeCreate
from app.database.session import get_db
from app.third_party_api import deezer_api
from app.third_party_api.deezer_api import InvalidPlaylistId, EmptyPlaylist

# DEVELOPMENT = os.getenv("DEVELOPMENT") == "True"

# region APP


app = FastAPI(
    title=settings.title,
    description=settings.description,
    version=settings.version
)

# CROSS-ORIGIN config
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origin,
    allow_credentials=settings.allow_credentials,
    allow_methods=settings.allow_methods,
    allow_headers=settings.allow_headers
)
app.add_middleware(SessionMiddleware, secret_key=settings.app_secret_key)

# Database; to avoid csrftokenError
app.add_middleware(DBSessionMiddleware, db_url=settings.database_uri)

# endregion

# Initialize API
deezer_api = deezer_api.DeezerAPI()

# Require user and password
security = HTTPBasic()


@app.post("/api/get/create-mode")
async def create_mode(mode: ModeCreate,
                      db_: Session = Depends(get_db),
                      credentials: HTTPBasicCredentials = Depends(security)):
    # Use compare_digest to avoid timing attacks
    correct_username = secrets.compare_digest(credentials.username, os.getenv("ADMIN_USER"))
    correct_password = secrets.compare_digest(credentials.password, os.getenv("ADMIN_PASSWORD"))

    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )

    return create_new_mode(mode=mode, db=db_)


@app.get("/api/get/modes")
async def get_modes():
    return db.session.query(Mode).all()


@app.get("/api/get/songs")
async def random_songs(playlist_id: str, amount: int = 10):
    if not playlist_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Please specify a playlist ID")

    try:
        tracks = deezer_api.get_rnd_of_playlist(playlist_id, amount)
        return tracks

    except InvalidPlaylistId:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid playlist ID")

    except EmptyPlaylist:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="The playlist is empty")

    except Exception as E:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(f"Unknown error: {E}"))
