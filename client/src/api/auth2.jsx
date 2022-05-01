import cryptoBrowserify from "crypto-browserify";
import * as queryString from "query-string";

const scopes =
    "user-top-read playlist-read-collaborative playlist-read-private user-read-private user-read-email user-read-recently-played";

const base64URLEncode = (str) =>
    str.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

const sha256 = (buffer) => cryptoBrowserify.createHash("sha256").update(buffer).digest();


const VALID_SCOPES = ["ugc-image-upload", "user-modify-playback-state", "user-read-playback-state",
    "user-read-currently-playing", "user-follow-modify", "user-follow-read",
    "user-read-recently-played", "user-read-playback-position", "user-top-read",
    "playlist-read-collaborative", "playlist-modify-public", "playlist-read-private",
    "playlist-modify-private", "app-remote-control", "streaming", "user-read-email",
    "user-read-private",
    "user-library-modify", "user-library-read"];

export class SpotifyAuth {
    constructor() {
        this.CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
        this.REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI
    }

    generateRandomString(k: number = 16) {
        let text = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (let i = 0; i < k; i++)
            text += characters.charAt(Math.floor(Math.random() * characters.length));
        return text;
    }

    generateAuthUrl(scopes: string): string | boolean {
        /* Generate a Spotify API auth link */
        // Check that the scopes are valid
        scopes.split(" ").forEach((scope) => {
            if (!scopes.includes(scope)) return false;
        });
        let state = this.generateRandomString(16);
        let queries = {
            response_type: 'code',
            client_id: this.CLIENT_ID,
            scope: scopes,
            redirect_uri: this.REDIRECT_URI,
            state: state
        };
        return `https://accounts.spotify.com/authorize?${queryString.stringify(queries)}`;

    }

    spotifyAuthorize(scopes: string = "playlist-read-private") {
        let url = this.generateAuthUrl(scopes);
        if (!url) {
            throw Error("Invalid Spotify API scope!");
        }
        window.location.replace(url);
    }
}
