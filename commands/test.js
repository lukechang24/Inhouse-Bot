require("dotenv").config()

const firebase = require("../firebase")
const test = 200
const lol = `${test >= 200 ? `hi \+${test}` : "no"}`
module.exports = {
    name: "!test",
    description: "Registers the player into the database",
    execute(msg, args, bot, firebase) {
        msg.channel.send(`\`\`\`diff\n-hi ther efolks\`\`\``)
    }
}