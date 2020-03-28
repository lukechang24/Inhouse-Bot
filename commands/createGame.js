require("dotenv").config()

const firebase = require("../firebase")

module.exports = {
    name: "!create",
    description: "Creates a inhouse lobby",
    execute(msg, args, bot, firebase) {
        firebase.findCurrentGame().get()
            .then(game => {
                if(game.size === 0) {
                    firebase.createGame({
                        players: [],
                        creator: msg.author.id
                    })
                    msg.channel.send("```Inhouse lobby created. Type '!queue' to join the game```")
                } else {
                    msg.reply("A game is already being hosted by...")
                }
            })
    }
}