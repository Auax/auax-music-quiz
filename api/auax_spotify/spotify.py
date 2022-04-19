import os
import random

import spotipy
from dotenv import load_dotenv
from spotipy.oauth2 import SpotifyClientCredentials


class SpotifyAPI:
    def __init__(self):
        # Base url
        self.base_url = "https://accounts.spotify.com"

        # Auth
        load_dotenv()
        self.CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
        self.CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

        self.spotify = spotipy.Spotify(
            client_credentials_manager=SpotifyClientCredentials(
                client_id=self.CLIENT_ID,
                client_secret=self.CLIENT_SECRET
            ))

        # Identifier : URI
        self.genres = {
            "all": None,
            "rock": "spotify:playlist:6TeyryiZ2UEf3CbLXyztFA",
            "hiphop": "spotify:playlist:5z0HyrtGeJAlxlsAa0REoP",
            "pop": "spotify:playlist:6mtYuOxzl58vSGnEDtZ9uB"
        }

    def random_song_of_playlist(self, playlist_id: str) -> list:
        """
        Return the preview_url of a random track of a playlist
        :param playlist_id: the id of the playlist
        :return: track [list]
        """
        playlist = self.spotify.playlist_items(playlist_id)
        preview_url = None
        song = None

        while preview_url is None:
            song = random.choice(playlist["items"])["track"]
            preview_url = song["preview_url"]

        return song

    def random_song_by_genre(self, genre: str) -> str:
        if genre not in self.genres.keys():
            return None
        return self.random_song_of_playlist(self.genres[genre])
