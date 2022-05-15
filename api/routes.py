import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from api.auax_spotify.spotify import SpotifyAPI, AccessTokenExpired, SongsIsNone, InvalidPlaylistId, TooManyRequests

load_dotenv()

ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN")
DEVELOPMENT = os.getenv("DEVELOPMENT") == "True"

# region APP config
# Create APP
app = FastAPI(
    title="Auax Music Quiz",
    description="A music quiz powered by FastAPI and Spotify",
    version="0.1.0"
)

# CROSS-ORIGIN config
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Set-Cookie"]
)
app.add_middleware(SessionMiddleware, secret_key=os.getenv("APP_SECRET_KEY"))
# endregion

# Spotify API
spotify_api = SpotifyAPI()


@app.get("/api/get/songs")
async def random_song(playlist_id: str, amount: int = 10):
    if not playlist_id:
        raise HTTPException(status_code=400, detail="Please specify a playlist ID")

    songs = []
    try:
        raw_songs = spotify_api.random_songs_by_genre(playlist_id, amount)

    except AccessTokenExpired:
        raise HTTPException(status_code=401, detail="The access token expired")

    except InvalidPlaylistId:
        raise HTTPException(status_code=404, detail="Invalid playlist ID")

    except SongsIsNone:
        raise HTTPException(status_code=500, detail="Could not fetch the songs")

    except TooManyRequests:
        raise HTTPException(status_code=429, detail="Too many requests")

    except Exception as E:
        raise HTTPException(status_code=500, detail=str(f"Unknown error: {E}"))

    for song in raw_songs:
        song = song["track"]
        songs.append({
            "preview_url": song["preview_url"],
            "name": song["name"],
            "artist": song["artists"][0]["name"],
            "image": song["album"]["images"][0]["url"]
        })

    return songs


@app.post("/callback")
async def login_callback(code):
    print(code)
