import os
from random import random
from typing import Union
from urllib.parse import urlencode

import requests
from dotenv import load_dotenv

from api.auax_spotify.exceptions import AuthenticationError
from api.misc import verbose_print


class SpotifyAPI:
    def __init__(self):
        # Base url
        self.base_url = "https://accounts.spotify.com"

        # Auth
        load_dotenv()
        self.CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
        self.CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
        self.REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")
        self.SCOPE = os.getenv("SPOTIFY_SCOPE")

        self.authenticated = False

    def require_auth(func):  # noqa
        """
        Decorator: Raises an error if the instance is not authenticated.
        """

        def wrapper(self):
            if not self.authenticated:
                raise AuthenticationError("The instance is not authenticated.")
            func(self)

        return wrapper

    def generate_auth_link(self, redirect_uri: str, verbose: bool = False) -> str:
        """
        Generate a Spotify API auth link
        :param redirect_uri: callback URL
        :param verbose: print output
        :return: URL [str]
        """
        params = urlencode({
            'client_id': self.CLIENT_ID,
            'scope': self.SCOPE,
            'redirect_uri': redirect_uri,
            'response_type': 'code'
        })

        url_ = f"{self.base_url}/authorize?{params}"
        verbose_print(f"Generated auth link: {url_}", verbose)

        return url_

    def get_token(self, code: str, verbose: bool = False) -> Union[str, None]:
        """
        Get the necessary token
        :param code: the code generated from the authorize url
        :param verbose: print output
        :return: token [str]
        """
        self.authenticated = True

        verbose_print("Getting the token from code...", verbose)

        auth_token_url = f"{self.base_url}/api/token"

        res = requests.post(auth_token_url, data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": "http://localhost:8888/spotify-api/callback",
            "client_id": self.CLIENT_ID,
            "client_secret": self.CLIENT_SECRET
        })

        res_body = res.json()
        return res_body.get("access_token")

    @require_auth
    def get_random_from_word(self, custom_word: bool = None, verbose: bool = False) -> str:
        """
        Get a random song using a random word from the list of the most common 5000 words
        :param custom_word: use a custom word instead a random one
        :param verbose: print output
        :return: song [str]
        """

        # Get word
        if custom_word:
            word = custom_word
        else:
            with open("./values/common_words.txt") as file:
                word = random.choice(file.read().split('\n'))

        # Get the song
        verbose_print(f"Retrieving songs for query '{word}'...", verbose)
