const prisma = require('../utils/prisma');
const ApiError = require('../errors/api-erros');

class AllUsersController {
    async getAllUser(req, res, next) {
        try {
            const topUsers = await prisma.user.findMany({
                select: {
                    firstName: true,
                    referralCount: true,
                    balance: true,
                    createdAt: true,
                    wallet: {
                        select: {
                            walletAddress: true
                        }
                    }
                },
                orderBy: {
                    balance: 'desc'
                },
            });

            // Har bir foydalanuvchini formatlash
            const formattedUsers = topUsers.map(user => ({
                firstName: user.firstName,
                referralCount: user.referralCount,
                earnings: user.balance,
                walletAddress: user.wallet.length > 0 ? user.wallet[0].walletAddress : 'No wallet', // Agar wallet mavjud bo'lmasa 'No wallet'
                date: new Date(user.createdAt).toLocaleDateString()
            }));

            return res.json({
                message: "Top referrals",
                data: formattedUsers
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AllUsersController();
