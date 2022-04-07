import os

from dotenv import load_dotenv
from flask import Flask, session, request, redirect, jsonify, Response
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO

from api.auax_spotify.spotify_v2 import SpotifyAPI

load_dotenv()

# Flask App
app = Flask(__name__, static_folder="/client/build")
app.secret_key = os.getenv("FLASK_APP_SECRET_KEY")
app.config["CORS_HEADERS"] = "Content-Type"
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS")

CORS(app, resources={"/*": {"origins": ALLOWED_ORIGINS}}, support_credentials=True)

# You can enable logger and engineio_logger for debugging purposes
socketio = SocketIO(app,
                    cors_allowed_origins=ALLOWED_ORIGINS,
                    logger=True,
                    engineio_logger=False,
                    cors_credentials=True)

# Spotify API
spotify_api = SpotifyAPI()
SPOTIFY_API_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")


@app.route("/api/spotify/login", methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def authenticate():
    # Invalid request method
    if request.method == 'GET':
        print()
        return Response("request is not post", status=405, mimetype="application/json")

    redirect_uri = request.form.get("redirect_uri")
    auth_link = spotify_api.generate_auth_link(redirect_uri)
    return jsonify(auth_link)


# Redirect URI (callback url to spotify"s API)
@app.route("/spotify-api/callback")
def spotify_api_callback():
    session.clear()

    code = request.args.get("code")
    token = spotify_api.get_token(code)

    if not token:
        return redirect("/error?q=Error while authenticating the Spotify token!")

    session["token"] = token

    #

    redirect("/")
