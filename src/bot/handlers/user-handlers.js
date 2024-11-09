const prisma = require('../../utils/prisma');
const time = require('../../utils/time');
const { mainButtons } = require('../buttons');


const start = async ctx => {
    const exists = await prisma.user.findFirst({ where: { telegramId: ctx.from.id.toString() } });

    if (exists) {
        
        return await ctx.replyWithHTML(
            `Hey there! 🚀 Welcome to <b>Black Wallet</b> – your ultimate gateway to the world of crypto trading! 📲 With top coins and tokens at your fingertips, it’s never been easier to dive into the market.\n\nExciting news! We're launching our Telegram mini-app 🌐, where you can start farming points today! Every point brings you closer to exclusive perks and bonuses waiting just around the corner! 🌠\n\nGot friends? Bring 'em along – the more, the richer! 🌱\n\nAt <b>Black Wallet</b>, growth is limitless, and every trade is a step toward boundless possibilities! 💸`
            , mainButtons
        )
    } else {
        const photos = await ctx.telegram.getUserProfilePhotos(ctx.from.id)

        await prisma.user.create({
            data:
                {
                    firstName: ctx.from.first_name,
                    telegramId: ctx.from.id.toString(),
                    profileImage: photos.photos[0][0].file_id,
                    date: time().formattedDate,
                    time: time().formattedTime
                }
        });

        return await ctx.replyWithHTML(
            `Hey there! 🚀 Welcome to <b>Black Wallet</b> – your ultimate gateway to the world of crypto trading! 📲 With top coins and tokens at your fingertips, it’s never been easier to dive into the market.\n\nExciting news! We're launching our Telegram mini-app 🌐, where you can start farming points today! Every point brings you closer to exclusive perks and bonuses waiting just around the corner! 🌠\n\nGot friends? Bring 'em along – the more, the richer! 🌱\n\nAt <b>Black Wallet</b>, growth is limitless, and every trade is a step toward boundless possibilities! 💸`
            , mainButtons
        )
    }
}


module.exports = {
    start
}

