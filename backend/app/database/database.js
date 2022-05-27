const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();
// Initialize the app with a service account, granting admin privileges

admin.initializeApp({
    // Use environment variables instead to deploy.
    credential: admin.credential.cert({
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Remove \n
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    }),
    // The database URL depends on the location of the database
    databaseURL: "https://DATABASE_NAME.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.firestore();
const modesRef = db.collection("modes").orderBy("genre", "desc");

module.exports = {
    db,
    modesRef,
};