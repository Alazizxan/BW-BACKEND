const prisma = require('../../utils/prisma');
const {adminButtons, statisticButtons} = require('../buttons')

const ADMINS = [
    6219999739
]

const admin = async ctx => {
    if (ADMINS.includes(ctx.from.id)) {
        return ctx.reply('👤 ADMIN xush kelibsiz', adminButtons)
    }
}

const back = async ctx => {
     if (ctx.callbackQuery) {
         await ctx.answerCbQuery();
         await ctx.deleteMessage();
     }

     return await ctx.reply(`👤 ADMIN panel`, adminButtons);
}

const statistic = async ctx => {
    try {
        const count = await prisma.user.count();

        if (ctx.callbackQuery) {
            await ctx.answerCbQuery();
            await ctx.deleteMessage();
        }

        return await ctx.reply(`Barcha userlar: ${count}`, statisticButtons);
    } catch (error) {
        console.error('Error in statistic handler:', error);
        if (ctx.callbackQuery) {
            await ctx.answerCbQuery('Something went wrong').catch(console.error);
        }
        throw error;
    }
};


module.exports = {
    admin,
    statistic,
    back
}