import admin from "firebase-admin";

// Fetch the service account key JSON file contents
import serviceAccount from "./config/serviceAccountKey.json" assert {type: "json"};

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // The database URL depends on the location of the database
    databaseURL: "https://DATABASE_NAME.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
export const db = admin.firestore();
export const modesRef = db.collection("modes").orderBy("genre", "desc");
