require("dotenv").config()

module.exports = {
    name: "!commands",
    description: "Lists the commands for Inhouse-Bot",
    execute(msg, args, bot, firebase) {
        msg.reply("\n**!register** - registers you into Inhouse-Bot's database \n**!create** - creates an inhouse lobby \n**!queue** - places you into the inhouse lobby \n**!randomize** - randomizes the teams by average elo \\*\\* \n**!winner team[x]** - records the inhouse game results depending on which team that won \\*\\* \n**!cancel** - cancels the current inhouse queue\n**!stats** - displays your stats, or alternatively, the player whose username you type in front of the command \n**!matchHistory** - displays the last 5 inhouse matches, or alternatively, up to the number you type in front of the command \n\n*\*\* These commands are only usable by room creator*")
    }
}