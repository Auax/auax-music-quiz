import os
import random

import spotipy
from dotenv import load_dotenv
from spotipy import MemoryCacheHandler, CacheFileHandler
from spotipy.oauth2 import SpotifyOAuth


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


class AccessTokenExpired(Exception):
    pass


class InvalidPlaylistId(Exception):
    pass


class SongsIsNone(Exception):
    pass


class TooManyRequests(Exception):
    pass


class SpotifyAPI:
    def __init__(self):
        # Auth
        load_dotenv()
        self.CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
        self.CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
        self.REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")
        self.AUTH_CACHE = os.getenv("AUTH_CACHE")

        auth = SpotifyOAuth(
            client_id=self.CLIENT_ID,
            client_secret=self.CLIENT_SECRET,
            redirect_uri=self.REDIRECT_URI,
            show_dialog=False,
            cache_handler=MemoryCacheHandler(self.AUTH_CACHE))
        self.spotipy = spotipy.Spotify(auth_manager=auth)

    def get_songs_of_playlist(self, playlist_id: str, market: str = "US") -> list | None:
        """
        Get all tracks of a playlist
        :param playlist_id: Spotify Playlist ID [str]
        :param market: market [str] (US usually has most tracks with preview_url)
        :return: tracks [list] | Exception
        """

        offset = 0
        response = self.spotipy.playlist_items(playlist_id, market=market, limit=100)

        # Handle errors
        error = response.get("error")
        if error:
            status = error.get("status")
            if status == 404:
                raise InvalidPlaylistId
            elif status == 401:
                raise AccessTokenExpired
            elif status == 429:
                raise TooManyRequests

        tracks = response.get("items")

        if not tracks:
            raise SongsIsNone

        while response["next"]:
            offset += 100
            response = self.spotipy.playlist_items(playlist_id, market=market, limit=100, offset=offset)
            tracks.extend(response["items"])

        # Remove duplicate songs from playlist and assert they're not none
        names = []
        remove_duplicates = []
        for track in tracks:
            name = track["track"].get("name")
            preview_url = track["track"].get("preview_url")
            if name not in names and preview_url is not None and name is not None:
                names.append(name)
                remove_duplicates.append(track)

        return remove_duplicates

    def random_songs_by_genre(self, playlist_id: str, n_of_tracks: int, market: str = "US") -> list | None:
        """
        Get a list of random songs by a genre identifier.
        :param playlist_id: Spotify Playlist ID
        :param n_of_tracks: number of songs [int]
        :param market: market [str] (US usually has most tracks with preview_url)
        :return: songs [list] | Exception
        """
        songs = self.get_songs_of_playlist(playlist_id, market=market)
        print(f"Total songs: {len(songs)}")
        n_of_tracks = n_of_tracks if len(songs) >= n_of_tracks else len(songs)
        return random.sample(songs, k=n_of_tracks)
