const admin = require('firebase-admin');
const serviceAccount = require("./ServiceAccountKey.json")
const { players } = require("./commands/queue")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://inhouse-bot.firebaseio.com"
});

const db = admin.firestore()

module.exports = {
    test: () => {
        return db.collection("test").add({word: "hello"})
    },
    createGame: gameInfo => {
        return db.collection("currentGame").add(gameInfo)
    },
    findUser: id => {
        return db.collection("users").doc(id)
    },
    register: id => {
        return db.collection("users").doc(id).set({
            wins: 0,
            lost: 0,
            elo: 1200
        })
    },
    findCurrentGame: () => {
        return db.collection("currentGame")
    }
}