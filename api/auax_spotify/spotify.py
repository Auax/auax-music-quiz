import base64
import os
import random
import string
import urllib

import requests
from dotenv import load_dotenv


class Data:
    valid_scopes = ["ugc-image-upload", "user-modify-playback-state", "user-read-playback-state",
                    "user-read-currently-playing", "user-follow-modify", "user-follow-read",
                    "user-read-recently-played", "user-read-playback-position", "user-top-read",
                    "playlist-read-collaborative", "playlist-modify-public", "playlist-read-private",
                    "playlist-modify-private", "app-remote-control", "streaming", "user-read-email",
                    "user-read-private",
                    "user-library-modify", "user-library-read"]


class AccessTokenExpired(Exception):
    pass


class InvalidPlaylistId(Exception):
    pass


class SongsIsNone(Exception):
    pass


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

    def refresh_expired_token(self, refresh_token: str) -> dict | None:
        """
        Get a new Access Token with a Refresh Token
        :param refresh_token: the refresh_token
        :return: Access Token [str] | None
        """
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + base64.b64encode(
                bytes(f"{self.CLIENT_ID}:{self.CLIENT_SECRET}", "utf-8")).decode("utf-8")
        }

        data = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token
        }

        response = requests.post(f"{self.BASE_URL}/api/token", headers=headers, data=data)
        return response.json().get("access_token") if response.status_code == 200 else None

    @staticmethod
    def get_songs_of_playlist(token: str, playlist_id: str, market: str = "US") -> list | None:
        """
        Get all tracks of a playlist
        :param token: the access token [str]
        :param playlist_id: Spotify Playlist ID [str]
        :param market: market [str] (US usually has most tracks with preview_url)
        :return: tracks [list] | Exception
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

        # Handle errors
        error = response.get("error")
        if error:
            if error.get("status") == 404:
                raise InvalidPlaylistId
            elif error.get("status") == 401:
                raise AccessTokenExpired

        tracks = response.get("items")

        if not tracks:
            raise SongsIsNone

        while response["next"]:
            offset += 100
            response = requests.get(
                f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks?market={market}&limit=100&offset={offset}",
                headers=headers).json()
            tracks.extend(response["items"])

        # Remove duplicate songs from playlist and assert they're not none
        names = []
        remove_duplicates = []
        for track in tracks:
            name = track["track"]["name"]
            preview_url = track["track"]["preview_url"]
            if name not in names and preview_url is not None:
                names.append(name)
                remove_duplicates.append(track)

        return remove_duplicates

    def random_songs_by_genre(self, token: str, playlist_id: str, n_of_tracks: int, market: str = "US") -> list | None:
        """
        Get a list of random songs by a genre identifier.
        :param token: the access token [str]
        :param playlist_id: Spotify Playlist ID
        :param n_of_tracks: number of songs [int]
        :param market: market [str] (US usually has most tracks with preview_url)
        :return: songs [list] | Exception
        """
        songs = self.get_songs_of_playlist(token, playlist_id, market=market)
        n_of_tracks = n_of_tracks if len(songs) >= n_of_tracks else len(songs)
        print(f"Total songs: {n_of_tracks}")
        return random.sample(songs, k=n_of_tracks)
