// require("dotenv").config()

// module.exports = {
//     name: "!matchhistory",
//     description: "Displays the last 5(default) games",
//     execute(msg, args, bot, firebase) {
//         firebase.findMatchHistory().orderBy("date", "desc").limit(typeof parseInt(args[0]) === "number" && args[0] <= 10 ? parseInt(args[0]) : 5).get()
//             .then(async games => {
//                 let matchHistory = ""
//                 let count = 0;
//                 let matches = []
//                 await games.forEach(game => {
//                     matches.push(game.data())
//                 })

//                 for(let i = 0; i < matches.length; i++) {
//                     matchHistory += `${matches[i].date.toDate()} \nTEAM 1 ${matches[i].winner === "team1" ? "🥇" : ""}               TEAM 2 ${matches[i].winner === "team2" ? "🥇" : ""}\n`
//                     let matchInfo = ""
//                     for(let i = 0; i < matches[i].team1.length; i++) {
//                         try {
//                             const username1 = await bot.users.fetch(matches[i].team1[i].id).then(user => {
//                                 return user.username
//                             })
//                             const username2 = await bot.users.fetch(matches[i].team2[i].id).then(user => {
//                                 return user.username
//                             })
//                             matchInfo += `${username1}               ${username2} \n`
//                             if(i === matches[i].team1.length-1) {
//                                 matchInfo += "\n"
//                             }
//                         } catch (error) {
//                             console.log(error)
//                         }
//                     }
//                     matchHistory += matchInfo
//                 }

//                 msg.reply(`\`\`\`${matchHistory}\`\`\``)
//             })
//     }
// }
