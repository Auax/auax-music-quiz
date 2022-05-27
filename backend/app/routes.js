const {DeezerAPI} = require("./deezer_api/deezer");
const {modesRef, db} = require("./database/database");
const {modeSchema} = require("./database/modeSchema");
const DeezerExceptions = require("./deezer_api/exceptions");

// Initialize Deezer API
const deezerAPI = new DeezerAPI();

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
    console.log(`Fetched ${modes.length} modes >> /api/get/modes`);
}


/** Fetch the songs `[get]` */
const getSongsRoute = async (req, res) => {
    const pid = req.query.id;
    const amount = req.query.amount || 10;

    if (!pid) return res.status(400).send({detail: "invalid id"});

    try {
        let data = await deezerAPI.getSongs(pid, amount);
        if (data) res.json(data);
        // Data is null
        else res.status(400).send({detail: "no songs"});
    } catch (err) {
        // Handle errors
        if (err instanceof DeezerExceptions.InvalidPlaylistId) return res.status(404).send({detail: "id does not exist"});
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
        return;
    }
    console.log(`Created mode with PID: '${value.pid}' TITLE: '${value.title}' >> /api/get/modes`);

    // Create new document in Firebase
    await db.collection("modes").doc(value.pid).set(value);

    res.send("ok");
}

module.exports = {
    getModesRoute,
    getSongsRoute,
    createModeRoute,
};