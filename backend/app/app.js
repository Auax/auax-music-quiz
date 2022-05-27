const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load ENV
dotenv.config();

const app = express();

/* APP CONFIG */

// Adding Helmet to enhance your API's security
app.use(helmet());

// Using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Enabling CORS for all requests
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || "*",
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    headers: ["Content-Type", "Set-Cookie", "Authorization", "X-Requested-With"],
}));

console.log(process.env.ALLOWED_ORIGIN);

// TODO: add express-session (secret key)

// Adding morgan to log HTTP requests
app.use(morgan('combined'));


module.exports = {
    app
};