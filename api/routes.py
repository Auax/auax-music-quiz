import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from api.auax_spotify.spotify import SpotifyAPI

load_dotenv()

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS")
# SPOTIFY_API_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")

# Create APP
app = FastAPI(
    title="Auax Music Quiz",
    description="A music quiz powered by FastAPI and Spotify",
    version="0.1.0"
)

# CROSS-ORIGIN config
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Spotify API
spotify_api = SpotifyAPI()


@app.get("/api/get/{genre}/{ammount}")
async def random_song(genre: str, ammount: int = 10):
    songs = []

    raw_songs = spotify_api.random_songs_by_genre(genre, 200)

    if not raw_songs:
        raise HTTPException(status_code=400, details="Song is null")

    for song in raw_songs:
        song = song["track"]
        songs.append({
            "preview_url": song["preview_url"],
            "name": song["name"],
            "artist": song["artists"][0]["name"],
            "image": song["album"]["images"][0]["url"]
        })

    return songs
