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

    def random_song_of_playlist(self, playlist_id: str):
        playlist = self.spotify.playlist_items(playlist_id)
        return random.choice(playlist["items"])["track"]["href"]

    def random_song_by_genre(self, genre: str) -> str:
        if genre not in self.genres.keys():
            return None
        return self.random_song_of_playlist(self.genres[genre])

    def get_song_from_playlist(self):
        results = self.spotify.artist_albums("spotify:artist:7dGJo4pcD2V6oG8kP0tJRR", album_type='album')
        albums = results['items']
        while results['next']:
            results = self.spotify.next(results)
            albums.extend(results['items'])

        for album in albums:
            print(album['name'])
