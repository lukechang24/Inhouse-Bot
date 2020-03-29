require("dotenv").config()

module.exports = {
    name: "!commands",
    description: "Lists the commands for Inhouse-Bot",
    execute(msg, args, bot, firebase) {
        msg.reply("\n**!register** - registers you into Inhouse-Bot's database \n**!create** - creates an inhouse lobby \n**!queue** - Places you into the inhouse lobby \n**!randomize** - randomizes the teams by average elo (L) \n**!winner team[x]** - Records the inhouse game results depending on which team that won (L) \n**!stats** - Displays your stats, or alternatively, the player whose username you type in front of the command \n**!matchHistory** - Displays the last 5 inhouse matches, or alternatively, up to the number you type in front of the command \n\n*(L) - Only usable by room creator*")
    }
}