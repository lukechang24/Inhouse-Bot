require("dotenv").config()

module.exports = {
    name: "!winner",
    description: "Records the results of the game",
    execute(msg, args, bot, firebase) {
        firebase.findCurrentGame().get()
        .then(game => {
            if(game.size === 1) {
                game.forEach(snap => {
                    firebase.findUser(msg.author.id).get()
                    .then(async user => {
                        if(user.id === snap.data().creator) {
                            if(args[0] === "team1".toLowerCase() || args[0] === "team2".toLowerCase()) {
                                let team1 = []
                                let team2 = []
                                if(args[0] === "team1") {
                                    await firebase.findCurrentGame().doc(snap.id).get()
                                        .then(async curGame => {
                                            team1 = [...curGame.data().team1]
                                            team2 = [...curGame.data().team2]
                                            for(let i = 0; i < team1.length; i++) {
                                                await firebase.findUser(team1[i].id).get()
                                                    .then(player => {
                                                        let lp = player.data().winStreak >= 2 ? 25 : 20
                                                        firebase.findUser(player.id).update({elo: player.data().elo + lp, wins: player.data().wins + 1, winStreak: player.data().winStreak + 1})
                                                    })
                                                await firebase.findUser(team2[i].id).get()
                                                .then(player => {
                                                    let lp = 20
                                                    firebase.findUser(player.id).update({elo: player.data().elo - lp, losses: player.data().losses + 1, winStreak: 0})
                                                })
                                                await firebase.findCurrentGame().doc(snap.id).update({winner: "team2"})
                                            }
                                        })
                                } else {
                                    await firebase.findCurrentGame().doc(snap.id).get()
                                        .then(async curGame => {
                                            team1 = [...curGame.data().team1]
                                            team2 = [...curGame.data().team2]
                                            for(let i = 0; i < team2.length; i++) {
                                                await firebase.findUser(team2[i].id).get()
                                                    .then(player => {
                                                        let lp = player.data().winStreak >= 2 ? 25 : 20
                                                        firebase.findUser(player.id).update({elo: player.data().elo + lp, wins: player.data().wins + 1, winStreak: player.data().winStreak + 1})
                                                    })
                                                await firebase.findUser(team1[i].id).get()
                                                .then(player => {
                                                    let lp = 20
                                                    firebase.findUser(player.id).update({elo: player.data().elo - lp, losses: player.data().losses + 1, winStreak: 0})
                                                })
                                                await firebase.findCurrentGame().doc(snap.id).update({winner: "team2"})
                                            }
                                        })
                                }
                                let teamOne = ""
                                let teamTwo = ""
                                for(let i = 0; i < team1.length; i++) {
                                    let newElo1 = 0
                                    let newElo2 = 0
                                    let winStreak1 = null
                                    let winStreak2 = null
                                    let difference1 = 0
                                    let difference2 = 0
                                    await firebase.findUser(team1[i].id).get()
                                        .then(updatedUser => {
                                            newElo1 = updatedUser.data().elo
                                            difference1 = updatedUser.data().elo - team1[i].elo
                                            winStreak1 = updatedUser.data().winStreak >= 3 ? true : false
                                        })
                                    await firebase.findUser(team2[i].id).get()
                                        .then(updatedUser => {
                                            newElo2 = updatedUser.data().elo
                                            difference2 = updatedUser.data().elo - team2[i].elo
                                            winStreak2 = updatedUser.data().winStreak >= 3 ? true : false
                                        })
                                    try {
                                        const username1 = await bot.users.fetch(team1[i].id).then(user => {
                                            return user.username
                                        })    
                                        const username2 = await bot.users.fetch(team2[i].id).then(user => {
                                            return user.username
                                        })
                                        teamOne += `${username1} (${newElo1})(${difference1 > 0 ? `+${difference1}` : difference1}${winStreak1 ? "🔥" : ""})\n`
                                        teamTwo += `${username2} (${newElo2})(${difference2 > 0 ? `+${difference2}` : difference2}${winStreak2 ? "🔥" : ""})\n`
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }
                                msg.channel.send(`\`\`\`diff\nRESULTS \n\nTEAM 1 ${args[0] === "team1" ? "🥇" : ""} \n${teamOne} \n\nTEAM 2 ${args[0] === "team2" ? "🥇" : ""} \n${teamTwo}\`\`\``)
                                await firebase.findMatchHistory().doc().set({
                                    team1,
                                    team2,
                                    winner: args[0] === "team1" ? "team1" : "team2",
                                    date: firebase.Firestore.FieldValue.serverTimestamp()
                                }).then(() => {
                                    firebase.findCurrentGame().doc(snap.id).delete()
                                        .then(() => {
                                            console.log("Successfully deleted")
                                        })
                                })
                            } else {
                                msg.reply("Please type '!winner team1' or '!winner team2' to record the results")
                            }
                        } else {
                            msg.reply("Only the room leader can record the result")
                        }
                    })
                })
            } else {
                msg.reply("An inhouse has not been created yet. Type '!create' to do so.")
            }
        })
    }
}