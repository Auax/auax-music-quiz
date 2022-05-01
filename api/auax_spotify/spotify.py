import base64
import os
import random
import string
import urllib

import requests
from dotenv import load_dotenv


class Data:
    genres = {
        "all": None,
        "rock": "6TeyryiZ2UEf3CbLXyztFA",
        "hiphop": "5z0HyrtGeJAlxlsAa0REoP",
        "pop": "6mtYuOxzl58vSGnEDtZ9uB"
    }

    valid_scopes = ["ugc-image-upload", "user-modify-playback-state", "user-read-playback-state",
                    "user-read-currently-playing", "user-follow-modify", "user-follow-read",
                    "user-read-recently-played", "user-read-playback-position", "user-top-read",
                    "playlist-read-collaborative", "playlist-modify-public", "playlist-read-private",
                    "playlist-modify-private", "app-remote-control", "streaming", "user-read-email",
                    "user-read-private",
                    "user-library-modify", "user-library-read"]


class SpotifyAPI:
    def __init__(self):
        # Auth
        load_dotenv()
        self.CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
        self.CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
        self.REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")

        self.BASE_URL = "https://accounts.spotify.com"

    @staticmethod
    def generate_random_state():
        """ Return a random string to use as the state"""
        return "".join(random.choices(string.ascii_letters, k=16))

    # region Auth
    def get_auth_link(self, scopes: str) -> tuple[str, str] | bool:
        """
        Generate a Spotify API auth link
        :param scopes: spotify API scopes
        :return: URL, state [tuple[str, str]] | False [bool]
        """
        for scope in scopes.split():
            if scope not in Data.valid_scopes:
                return False

        state = SpotifyAPI.generate_random_state()
        queries = {
            "response_type": 'code',
            "client_id": self.CLIENT_ID,
            "scope": scopes,
            "redirect_uri": self.REDIRECT_URI,
            "state": state}

        url = f"{self.BASE_URL}/authorize?{urllib.parse.urlencode(queries)}"
        return url, state

    def get_access_token(self, code: str) -> dict | None:
        """
        Get an Access Token with the callback code
        :param code: the code provided in /api/login/callback
        :return: response.json [dict] | None
        """
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + base64.b64encode(
                bytes(f"{self.CLIENT_ID}:{self.CLIENT_SECRET}", "utf-8")).decode("utf-8")
        }
        data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": self.REDIRECT_URI
        }
        response = requests.post(f"{self.BASE_URL}/api/token", headers=headers, data=data)
        return response.json() if response.status_code == 200 else None

    # endregion

    @staticmethod
    def get_songs_of_playlist(token: str, playlist_id: str, market: str = "US") -> list | None:
        """
        Get all tracks of a playlist
        :param token: the access token [str]
        :param playlist_id: Spotify Playlist ID [str]
        :param market: market [str] (US usually has most tracks with preview_url)
        :return: tracks [list] | None
        """
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }

        offset = 0
        response = requests.get(
            f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks?market={market}&limit=100&offset={offset}",
            headers=headers).json()

        tracks = response.get("items")
        if not tracks:
            return None

        while response["next"]:
            offset += 100
            response = requests.get(
                f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks?market={market}&limit=100&offset={offset}",
                headers=headers).json()
            tracks.extend(response["items"])

        # Only songs with preview_url
        tracks = list(filter(lambda x: x["track"]["preview_url"] is not None, tracks))
        return tracks

    def random_songs_by_genre(self, token: str, playlist_id: str, n_of_tracks: int, market: str = "US") -> list | None:
        """
        Get a list of random songs by a genre identifier.
        :param token: the access token [str]
        :param playlist_id: Spotify Playlist ID
        :param n_of_tracks: number of songs [int]
        :param market: market [str] (US usually has most tracks with preview_url)
        :return: songs [list] | None
        """
        songs = self.get_songs_of_playlist(token, playlist_id, market=market)
        if not songs:
            return None
        print(f"Total songs: {len(songs)}")
        return random.choices(songs, k=n_of_tracks)
