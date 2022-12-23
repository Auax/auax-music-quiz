const axios = require("axios");
const qs = require("qs");
const logger = require("winston");
const SpotifyExceptions = require("./exceptions");

/**
 * A wrapper class for the Spotify API.
 */
class SpotifyZLLSWrapper {
    /**
     * Creates an instance of the Spotify wrapper.
     * @param {string} clientId - The client ID of your Spotify application.
     * @param {string} clientSecret - The client secret of your Spotify application.
     * @param {string} [market='US'] - The market to use when getting tracks.
     */
    constructor(clientId, clientSecret, market = 'US') {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.authToken = Buffer.from(`${this.clientId}:${this.clientSecret}`, 'utf-8').toString('base64');
        this.accessToken = this.getAccessToken();
        this.market = market;
    }

    /**
     * Gets an access token for the Spotify API.
     * @returns {Promise<string>} The access token.
     */
    async getAccessToken() {
        try {
            // Make post request to SPOTIFY API for access token, sending relevant info
            const token_url = 'https://accounts.spotify.com/api/token';
            const data = qs.stringify({'grant_type': 'client_credentials'});

            const response = await axios.post(token_url, data, {
                headers: {
                    'Authorization': `Basic ${this.authToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            // Return access token
            return response.data.access_token;
        } catch (error) {
            //on fail, log the error in console
            logger.error(error);
        }
    }

    /**
     * Get the number of tracks in a playlist.
     * @param {string} playlistId The ID of the playlist.
     * @returns {Promise<number>} The number of tracks in the playlist.
     */
    async getNumberOfTracksInPlaylist(playlistId) {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                headers: {
                    Authorization: `Bearer ${await this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data?.tracks?.total || null;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Gets the name and image of a playlist using the Spotify API.
     * @param {string} playlistId - The ID of the playlist.
     * @returns {Promise} - A promise that resolves to an object containing the playlist's data
     */
    async getPlaylistInfo(playlistId) {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                Authorization: `Bearer ${await this.accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    /**
     * Gets the tracks in a playlist.
     * @param {string} playlistId - The ID of the playlist.
     * @param limit - The number of tracks to get
     * @param offset - Offset in playlist to get songs
     * @returns {Promise<Array<Object>>} The tracks in the playlist.
     */
    async getPlaylistTracks(playlistId, limit = 100, offset = 0) {
        const headers = {
            Authorization: `Bearer ${await this.getAccessToken()}`,
            'Content-Type': 'application/json'
        };
        const params = {
            market: this.market,
            limit: limit,
            offset: offset
        };

        try {
            const tracksResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers,
                params
            });
            return tracksResponse.data.items;

        } catch (e) {
            if (e.response.status === 404) {
                throw new SpotifyExceptions.InvalidPlaylistId;
            }
            logger.error(e);
        }
    }

    async

    /**
     * Gets the tracks in a playlist that have a preview URL.
     * @param {string} playlistId - The ID of the playlist.
     * @param limit - The number of tracks to get
     * @param offset - Offset in playlist to get songs
     * @returns {Promise<Array<Object>>} The tracks in the playlist with a preview URL.
     */
    async getPreviewTracks(playlistId, limit = 100, offset = 0) {
        const tracks = await this.getPlaylistTracks(playlistId, limit, offset);
        return tracks.filter(track => track.track.preview_url);
    }

    /**
     * Retries getting the preview tracks in a playlist until the specified threshold is reached or the maximum number of retries is reached.
     * @param {string} playlistId - The ID of the playlist.
     * @param expectedTracks - The number of tracks expected to be returned
     * @param limit - The number of tracks to get
     * @param offset - Offset in playlist to get songs
     * @param {number} [previewThreshold=90] - The minimum percentage of preview tracks to stop retrying.
     * @param {number} [maxRetries=10] - The maximum number of retries.
     */
    async retryPreviewUntilThreshold(playlistId, expectedTracks = 100, limit = 100, offset = 0, previewThreshold = 90, maxRetries = 10) {
        let tracks = null;
        let iterations = 0;
        while (!tracks && iterations < maxRetries) {
            const t = await this.getPreviewTracks(playlistId, limit, offset);
            if (t.length / expectedTracks * 100 < previewThreshold) {
                iterations += 1;
                continue;
            }
            tracks = t;
        }
        if (!tracks) return null;
        logger.info(`Total of ${tracks.length} tracks fetched using Iterations: ${iterations + 1} / ${maxRetries}`);
        return tracks
    }

    /**
     * Get semi-random tracks by a specific amount
     * @param {string} playlistId - The ID of the playlist.
     * @param {Number} amount - How many tracks will be returned.
     */
    async getRandomTracks(playlistId, amount) {
        // Count the tracks in the playlist
        const trackCount = await this.getNumberOfTracksInPlaylist(playlistId);
        // Generate a random offset
        // 100 is the max limit set by the official API
        const offset = trackCount > 100 ? Math.floor(Math.random() * (trackCount - 100)) : 0;
        logger.info(`Playlist offset of ${offset}`)
        // Fetch songs (we get a 100 songs max, then randomize the result and return the amount set)
        const songs = await this.retryPreviewUntilThreshold(playlistId, amount, 100, offset, 85);

        // Create an array of new song objects that include: title, preview(url), artists(array), image
        let newSongs = [];
        songs.forEach(song => {
            song = song["track"];
            newSongs.push({
                title: song["name"],
                preview: song["preview_url"] + ".mp3",
                artists: song["artists"],
                image: song["album"]["images"][0]["url"]
            })
        });
        if (newSongs.length > 0) {
            newSongs.sort(() => 0.5 - Math.random());
            newSongs = newSongs.slice(0, amount);
        }
        return newSongs;
    }
}

module.exports = {
    SpotifyZLLSWrapper
};