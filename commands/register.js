require("dotenv").config()

const firebase = require("../firebase")

module.exports = {
    name: "!register",
    description: "Registers the player into the database",
    execute(msg, args, bot, firebase) {
        firebase.findUser(msg.author.id).get()
            .then(user => {
                if(user.exists) {
                    msg.reply("You are already registered as a player.")
                } else {
                    firebase.register(msg.author.id)
                    msg.reply("You are now registered as a player.")
                }
            })
    }
}