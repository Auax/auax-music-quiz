import math
import os
import random

import spotipy
from dotenv import load_dotenv
from spotipy.oauth2 import SpotifyClientCredentials


class SpotifyAPI:
    def __init__(self):
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

    def get_songs_of_playlist(self, playlist_id: str, limit: int = 100) -> list:
        """
        Return the preview_url of a random track of a playlist
        :param playlist_id: the id of the playlist
        :return: track [list]
        :param limit: ammount of tracks [int]
        """
        songs = []
        iters = math.ceil(limit / 100)
        limit = int(limit / iters)

        for i in range(iters):
            playlist = self.spotify.playlist_items(playlist_id, limit=limit, offset=limit * i)["items"]
            # Only songs with preview_url
            songs.extend(list(filter(lambda x: x["track"]["preview_url"] is not None, playlist)))
        return songs

    def random_songs_by_genre(self, genre: str, limit: int) -> list | None:
        """
        Get a list of random songs by a genre identifier.
        :param genre: music genre identifier [str]
        :param limit: number of songs [int]
        :return: songs [list | None]
        """
        if genre not in self.genres.keys():
            return None
        return random.shuffle(self.get_songs_of_playlist(self.genres[genre], limit=limit))

    def random_song_by_genre(self, genre: str) -> dict | None:
        """
        Get a random song by a genre identifier.
        :param genre: music genre identifier [str]
        :return: song [dict | None]
        """
        if genre not in self.genres.keys():
            return None
        return random.choice(self.get_songs_of_playlist(self.genres[genre]))
