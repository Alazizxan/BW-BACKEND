const prisma = require('../utils/prisma');
const ApiError = require('../errors/api-erros')

class WalletController {
    async createWallet(req, res, next) {
        try {
            const {telegramId, walletAddress} = req.body;

            const user = await prisma.user.findFirst({ where: { telegramId: telegramId.toString() }});
            if (!user) throw ApiError.BadRequest("User not found")

            const wallet = await prisma.wallet.create({ data: { walletAddress: walletAddress, userId: user.id } })
            return res.json({ message: "Wallet created", data: wallet })
        } catch (error) {
            next(error)
        }
    }

    async getWallet(req, res, next) {
        try {
            const user = await prisma.user.findFirst({ where: { telegramId: req.params.id.toString() }});
            if (!user) return res.json({message: "Wallet not found", data: false})

            const wallet = await prisma.wallet.findFirst({where:  { userId: user.id }});
            if (!wallet) return res.json({message: "Wallet not found", data: false})

            return res.json({ message: "Wallet created", data: wallet })
        } catch  (error) {
            next(error);
        }
    }
}

module.exports = new WalletController()