require("dotenv").config()

const firebase = require("../firebase")

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

module.exports = {
    name: "!randomize",
    description: "Creates random teams for players",
    execute(msg, args, bot, firebase) {
        firebase.findCurrentGame().get()
            .then(game => {
                game.forEach(snap => {
                    if(snap.exists) {
                        if(snap.data().creator !== msg.author.id) {
                            msg.reply("Only the leader can randomize the teams")
                            return
                        }
                        if(snap.data().players.length === 2) {
                            let shuffled = shuffle(snap.data().players)
                            let team1 = shuffled.slice(0,2)
                            // let team2 = shuffled.slice(1,2)
                            console.log(team1)
                            let ave1 = team1.reduce((a,b,c,d) => {
                                firebase.findUser(b).get()
                                    .then(user => {
                                        if(c < d.length) {
                                            console.log(c)
                                            return a + user.data().elo
                                        } else {
                                            console.log(a, "hi")
                                            return a
                                        }
                                    })
                            }, 0)
                            // let ave2 = team2.reduce((a,b) => {
                            //     return a + b
                            // })
                            console.log(ave1, "this")
                        } else {
                            msg.reply("You cannot start without ten players in queue")
                        }
                    } else {
                        msg.reply("An inhouse has not been created yet. Type '!create' to do so.")
                    }
                })
            })
    }
}