require("dotenv").config()

module.exports = {
    name: "!cancel",
    description: "Cancels the current inhouse queue",
    execute(msg, args, bot, firebase) {
        firebase.findCurrentGame().get()
            .then(game => {
                if(game.size === 1) {
                    game.forEach(snap => {
                        if(msg.author.id === snap.data().creator) {
                            firebase.findCurrentGame().doc(snap.id).delete()
                                .then(() => {
                                    msg.reply("Inhouse queue canceled. Type '!create' to start a new one.")
                                })
                        } else {
                            msg.reply("Only the room leader can cancel the current inhouse")
                        }
                    })
                } else {
                    msg.reply("An inhouse has not been created yet. Type '!create' to do so.")
                }
            })
    }
}