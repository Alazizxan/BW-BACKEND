const {Markup} = require('telegraf');


const mainButtons = Markup.inlineKeyboard([
    [Markup.button.webApp('Launch Black Wallet', process.env.WEPAPP_URL)],
    [Markup.button.url('Launch Black Community', 'https://t.me/akbarshoxs_life')]
])


const adminButtons = Markup.inlineKeyboard([
    [Markup.button.callback('📊 Statistika', 'statistic')],
    [Markup.button.callback("⏬ Task qo'shish", 'add_task')],
])

const statisticButtons = Markup.inlineKeyboard([
    [{ text: '🔄 Refresh', callback_data: 'statistic' }],
    [{ text: '🔙 Back', callback_data: 'main_menu' }]
])


module.exports = {
    mainButtons,
    adminButtons,
    statisticButtons
};