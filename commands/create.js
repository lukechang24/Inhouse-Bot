require("dotenv").config()

module.exports = {
    name: "!create",
    description: "Creates a inhouse lobby",
    execute(msg, args, bot, firebase) {
        firebase.findUser(msg.author.id).get()
            .then(user => {
                if(user.exists) {
                    firebase.findCurrentGame().get()
                        .then(async game => {
                            if(game.size === 0) {
                                firebase.createGame({
                                    players: [],
                                    team1: [],
                                    team2: [],
                                    winner: null,
                                    creator: msg.author.id
                                })
                                msg.channel.send("```Inhouse lobby created. Type '!queue' to join the game, or '!cancel' to call off the inhouse```")
                            } else {
                                const creator = await bot.users.fetch(game.docs[0].data().creator).then(user => {
                                    return user.username
                                })
                                msg.reply(`A game is already being hosted by ${creator}`)
                            }
                        })
                } else {
                    msg.reply("You have not registered yet. Type '!register' to do so.")
                }
            })
    }
}