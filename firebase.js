const admin = require('firebase-admin');
const Firestore = require("@google-cloud/firestore")
const serviceAccount = require("./ServiceAccountKey.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://inhouse-bot.firebaseio.com"
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