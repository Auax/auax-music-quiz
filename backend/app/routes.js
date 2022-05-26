import {modesRef} from "./database/database.js";
import {modeSchema} from "./database/modeSchema.js";
import {InvalidPlaylistId} from "./deezer_api/exceptions.js";
import DeezerAPI from "./deezer_api/deezer.js";

// Initialize Deezer API
const deezerAPI = new DeezerAPI();

/* GET ROUTES */

/** Fetch the music modes `[get]` */
export const getModesRoute = async (req, res) => {
    let modes = []
    await modesRef.get().then((snapshot) => {
        snapshot.forEach(doc => {
            let data = doc.data();
            modes.push(data);
        })
    });
    console.log(`Fetched ${modes.length} modes >> /api/get/modes`)
    res.send(modes);
}


/** Fetch the songs `[get]` */
export const getSongsRoute = async (req, res) => {
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
        if (err instanceof InvalidPlaylistId) return res.status(404).send({detail: "id does not exist"});
        // Unknown error
        res.status(500).send({detail: `Unknown error: ${err}`});
    }
}


/* POST ROUTES */

/** Create a new mode and store it in the db `[post]` */
export const createModeRoute = async (req, res) => {
    const {error, value} = modeSchema.validate(req.body); // Validate the data received
    if (error) res.status(422).send({detail: error.details[0].message}); // Invalid body data
    console.log(value);
}