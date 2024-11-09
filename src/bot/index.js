const { Telegraf, session } = require('telegraf');
const { start } = require('./handlers/user-handlers')
const { admin, statistic, back} = require("./handlers/admin-handlers");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session())



bot.start(start)
bot.command('admin', admin)
bot.action('statistic', statistic)
bot.action('main_menu', back)


module.exports = bot;