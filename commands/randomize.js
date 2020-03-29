require("dotenv").config()

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

let count = 0
function makeItFair(elos) {
    let shuffled = shuffle(elos)
    let team1 = shuffled.slice(0,5)
    let team2 = shuffled.slice(5,10)
    let ave1 = team1.reduce((a,b) => a + b.elo, 0)/5
    let ave2 = team2.reduce((a,b) => a + b.elo, 0)/5
    if(Math.abs(ave1 - ave2) < 50) {
      return [team1, team2]
    } else if(count >= 150) {
      return null
    } else {
      count++
      makeItFair(elos)
    }
}

module.exports = {
    name: "!randomize",
    description: "Creates random teams for players",
    execute(msg, args, bot, firebase) {
        firebase.findCurrentGame().get()
            .then(game => {
                if(game.size === 1) {
                    game.forEach(snap => {
                        if(snap.data().creator !== msg.author.id) {
                            msg.reply("Only the room leader can randomize the teams")
                            return
                        }
                        if(snap.data().players.length === 2) {
                            const teams = makeItFair(snap.data().players)
                            if(teams) {
                                const [team1, team2] = [...teams]
                                console.log(team1, team2)
                                firebase.findCurrentGame().doc(snap.id).update({team1, team2}).then(async () => {
                                    let teamOne = ""
                                    let teamTwo = ""
                                    for(let i = 0; i < team1.length; i++) {
                                        const username1 = await bot.users.fetch(team1[i].id).then(user => {
                                            return user.username
                                        })
                                        const username2 = await bot.users.fetch(team2[i].id).then(user => {
                                            return user.username
                                        })
                                        teamOne += `${username1} (${team1[i].elo})${team1[i].id === snap.data().creator ? "(L)" : ""}\n`
                                        teamTwo += `${username2} (${team2[i].elo})${team2[i].id === snap.data().creator ? "(L)" : ""}\n`
                                    }
                                    msg.channel.send(`\`\`\`TEAM 1 \n${teamOne} \n \nTEAM 2 \n${teamTwo} \nAfter the game, type '!winner team[x]' to record the results\`\`\``)
                                })
                            } else {
                                msg.reply("Teams were hard to balance... try again")
                            }
                        } else {
                            msg.reply("You cannot start without ten players in queue")
                        }
                    })
                } else {
                    msg.reply("An inhouse has not been created yet. Type '!create' to do so.")
                }
            })
    }
}