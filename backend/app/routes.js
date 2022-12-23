const {modesRef, db} = require("./database/database");
const {modeSchema} = require("./database/modeSchema");
const SpotifyExceptions = require("./spotify_api/exceptions");
const logger = require("winston");
const {SpotifyZLLSWrapper} = require("./spotify_api/spotifyWrapper");
const {response} = require("express");


/* GET ROUTES */

/** Fetch the music modes `[get]` */
const getModesRoute = async (req, res) => {
    let modes = []
    await modesRef.get().then((snapshot) => {
        snapshot.forEach(doc => {
            let data = doc.data();
            modes.push(data);
        })
    });
    res.send(modes);
    logger.info(`Fetched ${modes.length} modes`);
}


/** Fetch the songs `[get]` */
const getSongsRoute = async (req, res) => {
    // Amount of songs to fetch
    const amount = req.query.amount || 10;
    // Playlist ID
    const pid = req.query.id;
    // Return if there's no playlist id set
    if (!pid) return res.status(400).send({detail: "invalid id"});

    try {
        // Create Spotify Wrapper instance
        const spotifyWrapper = new SpotifyZLLSWrapper(process.env.SPOTIFY_CLIENT_ID, process.env.SPOTIFY_CLIENT_SECRET);
        const songs = await spotifyWrapper.getRandomTracks(pid, amount);

        // Extract the playlist name and image from the playlist
        const playlistData = await spotifyWrapper.getPlaylistInfo(pid);
        const playlistName = playlistData.name;
        const playlistImage = playlistData.images[0].url;

        // Craft response object
        const responseData = {
            playlist: {
                name: playlistName,
                image: playlistImage
            },
            songs: [...songs]
        }

        res.send(responseData);
    } catch (err) {
        // Handle errors
        if (err instanceof SpotifyExceptions.InvalidPlaylistId) return res.status(404).send({detail: "id does not exist"});
        // Unknown error
        res.status(500).send({detail: `Unknown error: ${err}`});
    }
}


/* POST ROUTES */

/** Create a new mode and store it in the db. Requires an HTTP Basic Authentication. `[post]` */
const createModeRoute = async (req, res) => {
    // Check HTTP basic auth
    const {error, value} = modeSchema.validate(req.body); // Validate the data received
    if (error) {
        res.status(422).send({detail: error.details[0].message}); // Invalid body data
        logger.error(error);
        return;
    }
    logger.info(`Created mode with PID: '${value.pid}' TITLE: '${value.title}' >> /api/get/modes`);

    // Create new document in Firebase
    await db.collection("music-modes").doc(value.pid).set(value);
    res.send("ok");
}

module.exports = {
    getModesRoute,
    getSongsRoute,
    createModeRoute,
};