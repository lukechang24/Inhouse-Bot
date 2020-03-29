require("dotenv").config()
const Discord = require("discord.js")
const bot = new Discord.Client()
bot.commands = new Discord.Collection()
const botCommands = require("./commands")
const firebase = require("./firebase")

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key])
})

const TOKEN = process.env.TOKEN

bot.on("ready", () => {
    console.info(`${bot.user.tag} is ready to roll!`)
})

bot.on("message", async msg => {
    const args = msg.content.split(/ +/)
    const command = args.shift().toLowerCase()
    console.info(`Called command: ${command}`)
    if(!bot.commands.has(command)) {
        return
    }
    try {
        await bot.commands.get(command).execute(msg, args, bot, firebase)
    } catch (error) {
        console.error(error)
        msg.reply('There was an error trying to execute that command!')
    }
})

bot.login(TOKEN);
