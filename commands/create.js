require("dotenv").config()

module.exports = {
    name: "!create",
    description: "Creates a inhouse lobby",
    execute(msg, args, bot, firebase) {
        firebase.findUser(msg.author.id).get()
            .then(user => {
                if(user.exists) {
                    firebase.findCurrentGame().get()
                        .then(game => {
                            if(game.size === 0) {
                                firebase.createGame({
                                    players: [],
                                    team1: [],
                                    team2: [],
                                    winner: null,
                                    creator: msg.author.id
                                })
                                msg.channel.send("```Inhouse lobby created. Type '!queue' to join the game```")
                            } else {
                                msg.reply("A game is already being hosted by...")
                            }
                        })
                } else {
                    msg.reply("You have not registered yet. Type '!register' to do so.")
                }
            })
    }
}