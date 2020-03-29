// require("dotenv").config()

// let playerIds = []
// let players = []

// module.exports = {
//     name: "!queue",
//     description: "Adds the player to the inhouse lobby",
//     execute(msg, args, bot, firebase) {
//         let playerNames = ""
//         firebase.findUser(msg.author.id).get()
//             .then(user => {
//                 if(user.exists) {
//                     firebase.findCurrentGame().get()
//                         .then(async game => {
//                             if(game.size === 1 && playerIds.length < 10) {
//                                 if(players.indexOf(msg.author.id) === -1) {
//                                     playerIds.push(msg.author.id)
//                                     players.push(user.data())
//                                     for(let i = 0; i < playerIds.length; i++) {
//                                         try {
//                                             const username = await bot.users.fetch(playerIds[i]).then(user => {
//                                                 return user.username
//                                             })
//                                             playerNames += `${username} \n`
//                                         } catch (error) {
//                                             console.log(error)
//                                         }
//                                     }
//                                     if(playerIds.length === 10) {
//                                         firebase.findCurrentGame().get()
//                                             .then(game => {
//                                                 game.forEach(curGame => {
//                                                     firebase.findCurrentGame().doc(curGame.id).update({players})
//                                                 })
//                                             })
//                                     }
//                                     msg.channel.send(`\`\`\`Players: \n \n${playerNames}${playerIds.length === 10 ? "\nType '!randomize' to assign teams based off average elos. GL HF!" : ""}\`\`\``)
//                                 } else {
//                                     msg.reply("You are already queued for this game")
//                                 }
//                             } else {
//                                 msg.reply("An inhouse has not been created yet. Type '!create' to do so.")
//                             }
//                         })
//                 } else {
//                     msg.reply("You have not registered yet. Type '!register' to do so.")
//                 }
//             })
//     },
//     players
// }