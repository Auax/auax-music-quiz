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
async def random_song_by_genre(genre: str, ammount: int):
    songs = []
    ammount = ammount or 10

    # TODO : Changed function to return the ammount of songs altogether

    for _ in range(ammount):
        song = spotify_api.random_song_by_genre(genre)

        if not song:
            raise HTTPException(status_code=400, details="Song is null")

        print(song)
        songs.append({
            "preview_url": song["preview_url"],
            "name": song["name"],
            "artist": song["artists"][0]["name"],
            "image": song["album"]["images"][0]["url"]
        })

    return songs
