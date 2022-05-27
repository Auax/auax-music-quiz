const axios = require("axios");

const DeezerExceptions = require("./exceptions.js");

class DeezerAPI {
    constructor() {
        this.API_BASE = "https://api.deezer.com/";
    }

    async getSongs(playlist, amount) {
        const res = await axios.get(`${this.API_BASE}/playlist/${playlist}`);
        const data = await res.data;

        // Handle errors
        const error = data.error;
        if (error) {
            switch (error.message) {
                case "no data":
                    throw new DeezerExceptions.InvalidPlaylistId;

                // Add more errors here
            }
        }

        let tracks = data.tracks.data;
        let filteredTracks = []
        await tracks.forEach(song => {
            if (song.preview)
                filteredTracks.push({
                    title: song.title,
                    preview: song.preview,
                    artist: song.artist.name,
                    image: song.album.cover_xl,
                });
        });
        if (filteredTracks.length > 0) {
            filteredTracks.sort(() => 0.5 - Math.random());
            filteredTracks = filteredTracks.slice(0, amount);
        }
        return filteredTracks.length > 0 ? filteredTracks : null;

    }
}

module.exports = {
    DeezerAPI
};