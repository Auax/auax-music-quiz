import dotenv from "dotenv";
import app from "./app/config.js";
import * as routes from "./app/routes.js";
import {createModeRoute} from "./app/routes.js";

// Load ENV
dotenv.config();


/* ROUTES */
// GET
app.get("/api/get/modes", routes.getModesRoute);

app.get("/api/get/songs", routes.getSongsRoute);

// POST
app.post("/api/post/create-mode", routes.createModeRoute);

/* RUN APP */
const PORT = process.env.PORT || 8000

// Start server
app.listen(PORT, () => {
    console.log(`Started backend server!`);
});