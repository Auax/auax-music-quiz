const dotenv = require("dotenv");

const {app, allowed_origin} = require("./app/app")
const {basicAuth} = require("./app/middleware/auth");
const routes = require("./app/routes");
const {SpotifyZLLSWrapper} = require("./app/spotify_api/spotifyWrapper");

// Load ENV
dotenv.config();

/* ROUTES */

app.get("/", (req, res) => res.send({allowed: allowed_origin}));

// GET
app.get("/api/get/modes", routes.getModesRoute);

app.get("/api/get/songs", routes.getSongsRoute);

// POST
app.post("/api/post/create-mode", basicAuth, routes.createModeRoute);

/* RUN APP */
const PORT = process.env.PORT || 8000

// Start server
app.listen(PORT, () => {
    console.log("Started backend server!");
});