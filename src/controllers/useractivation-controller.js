const prisma = require('../utils/prisma');

class UserDetailsController {
    // Telegram ID orqali userni activation va transaction ma'lumotlarini olish
    async getUserDetails(req, res, next) {
        try {
            const { telegramId } = req.params;

            // Userni Telegram ID orqali qidirish
            const user = await prisma.user.findFirst({
                where: { telegramId: telegramId.toString() },
                include: {
                    transactions: true, // Userning transactionlari
                },
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Userning activation va transaction ma'lumotlarini qaytarish
            return res.json({
                message: "User details",
                data: {
                    activation: user.activation,
                    transactions: user.transactions,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserDetailsController();
