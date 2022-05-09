import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.sessions import SessionMiddleware

from api.auax_spotify.spotify import SpotifyAPI, AccessTokenExpired, SongsIsNone, InvalidPlaylistId

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


@app.get("/api/login")
async def login_auth(scope: str = "playlist-read-private") -> JSONResponse:
    """
    Returns the login URL and the state cookie
    :return: JSONRespnonse(url)
    """
    url, state = spotify_api.get_auth_link(scope)
    if not url:
        raise HTTPException(status_code=400, detail="Invalid Spotify API scope")

    res = {"url": url, "auth_state": state}
    response = JSONResponse(res)
    # Add the authState cookie to protect the user against cross-site request forgery
    # Expires in 60 seconds
    # if DEVELOPMENT:
    #     response.set_cookie(key="authState", value=state, httponly=False, expires=3600, secure=True, samesite="none")
    # else:
    #     response.set_cookie(key="authState", value=state, httponly=False, expires=3600, secure=True, samesite="none")

    return response


@app.get("/api/refresh_token")
async def refresh_expired_token(refresh_token: str) -> str:
    """
    Returns a new token
    :param refresh_token: the saved refresh_token
    :return: str
    """
    token = spotify_api.refresh_expired_token(refresh_token)
    if not token:
        raise HTTPException(status_code=500, detail="Could not get a new token")
    return token


@app.post("/api/login/callback")
async def login_callback(code):
    # Check for conflicts

    access_token = spotify_api.get_access_token(code)

    if not access_token:
        raise HTTPException(status_code=500, detail="Spotify Access Token response is null")

    # Craft response
    res = {
        "access_token": access_token["access_token"],
        "refresh_token": access_token["refresh_token"],
        "token_scope": access_token["scope"],
        "expires_in": access_token["expires_in"]
    }
    response = JSONResponse(res)

    # expires_in = access_token["expires_in"]
    # # Set all cookies
    # if DEVELOPMENT:
    #     response.set_cookie(key="accessToken", value=access_token["access_token"], httponly=False, expires=expires_in,
    #                         samesite="lax")
    #     response.set_cookie(key="refreshToken", value=access_token["refresh_token"], httponly=False, expires=expires_in,
    #                         samesite="lax")
    #     response.set_cookie(key="tokenScope", value=access_token["scope"], httponly=False, expires=expires_in,
    #                         samesite="lax")
    #     response.set_cookie(key="expiresIn", value=access_token["expires_in"], httponly=False, expires=expires_in,
    #                         samesite="lax")
    # else:
    #     response.set_cookie(key="accessToken", value=access_token["access_token"], httponly=False, expires=expires_in,
    #                         secure=True, samesite="none")
    #     response.set_cookie(key="refreshToken", value=access_token["refresh_token"], httponly=False, expires=expires_in,
    #                         secure=True, samesite="none")
    #     response.set_cookie(key="tokenScope", value=access_token["scope"], httponly=False, expires=expires_in,
    #                         secure=True, samesite="none")
    #     response.set_cookie(key="expiresIn", value=access_token["expires_in"], httponly=False, expires=expires_in,
    #                         secure=True, samesite="none")
    return response


@app.get("/api/get/songs")
async def random_song(token: str, playlist_id: str, amount: int = 10):
    if not token:
        raise HTTPException(status_code=400, detail="Please specify a token")

    if not playlist_id:
        raise HTTPException(status_code=400, detail="Please specify a playlist ID")

    songs = []
    try:
        raw_songs = spotify_api.random_songs_by_genre(token, playlist_id, amount)

    except AccessTokenExpired:
        raise HTTPException(status_code=401, detail="The access token expired")

    except InvalidPlaylistId:
        raise HTTPException(status_code=404, detail="Invalid playlist ID")

    except SongsIsNone:
        raise HTTPException(status_code=500, detail="Could not fetch the songs")

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
