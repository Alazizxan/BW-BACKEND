const prisma = require('../utils/prisma');

class UsersController {
    async register(req, res, next) {
        try {
            const {firstName, profileImage, telegramId, referall} = req.body;
            const candidate = await prisma.user.findFirst({where: { telegramId: telegramId.toString() }});


            if (candidate) return res.json({ message: "This user already exists", data: candidate });

            const user = await prisma.user.create({ data: {
                    firstName: firstName,
                    profileImage: profileImage,
                    telegramId: telegramId.toString(),
                    referall: referall.toString()
            } });


            return res.json({ message: "User created", data: user });
        }catch (error) {
            next(error);
        }
    }
}


module.exports = new UsersController();
