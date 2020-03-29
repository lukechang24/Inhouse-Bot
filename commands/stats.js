require("dotenv").config()

module.exports = {
    name: "!stats",
    description: "Displays the stats of the player",
    execute(msg, args, bot, firebase) {
        firebase.findStats().where("username", "==", args.length > 0 ? args.join(" ").toLowerCase() : `${msg.author.username.toLowerCase()}`).get()
            .then(snap => {
                if(snap.size >= 1) {
                    snap.forEach(async user => {
                        const stats = user.data()
                        const username = await bot.users.fetch(user.id).then(player => {
                            return player.username
                        })
                        msg.reply(`\`\`\`${username}'s Profile \n\nElo: ${stats.elo} \nWins: ${stats.wins} \nLosses: ${stats.losses} \nWin streak: ${stats.winStreak}\`\`\``)
                    })
                } else {
                    msg.reply("Unable to find that a player by that username in the database.")
                }
            })
    }
}