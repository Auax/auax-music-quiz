import random
from typing import Any

import deezer
from deezer.exceptions import DeezerAPIException


class InvalidPlaylistId(DeezerAPIException):
    pass


class EmptyPlaylist(Exception):
    pass


class DeezerAPI:
    def __init__(self):
        self.client = deezer.Client()

    def get_songs_of_playlist(self, playlist_id) -> list:
        """
        Get all tracks of a playlist
        :param playlist_id: Deezer playlist ID [str]
        :return: tracks [list] | Exception
        """
        try:
            tracks = self.client.get_playlist(playlist_id).tracks
        except DeezerAPIException as e:
            if "no data" in str(e):
                raise InvalidPlaylistId
            raise DeezerAPIException(e)

        # Error handling
        if not tracks:
            raise EmptyPlaylist

        return [{"title": t.title,
                 "preview": t.preview,
                 "artist": t.artist.name,
                 "image": t.album.cover_xl
                 } for t in tracks if t.preview]

    def get_rnd_of_playlist(self, playlist_id: Any, k: int = 10) -> list | None:
        """
        Get a list of random songs by a genre identifier.
        :param playlist_id: Deezer playlist ID [str]
        :param k: number of songs to return [int]
        :return: songs [list] | Exception
        """
        songs = self.get_songs_of_playlist(playlist_id)
        length = len(songs)
        n_of_tracks = k if length >= k else length
        return random.sample(songs, k=n_of_tracks)
