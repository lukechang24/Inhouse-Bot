const admin = require('firebase-admin');
const Firestore = require("@google-cloud/firestore")
require("dotenv").config()

admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_id": process.env.FIREBASE_CLIENT_ID,
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
        "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
        "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_CERT_URL
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.firestore()

module.exports = {
    Firestore,
    test: () => {
        return db.collection("test").add({word: "hello"})
    },
    createGame: gameInfo => {
        return db.collection("currentGame").add(gameInfo)
    },
    findUser: id => {
        return db.collection("users").doc(id)
    },
    findStats: () => {
        return db.collection("users")
    },
    register: (id, username) => {
        return db.collection("users").doc(id).set({
            id,
            username,
            wins: 0,
            losses: 0,
            elo: 1200,
            winStreak: 0
        })
    },
    findCurrentGame: () => {
        return db.collection("currentGame")
    },
    findMatchHistory: () => {
        return db.collection("matchHistory")
    }
}