const prisma = require('../utils/prisma');

class CountdownController {
    async getDate(req, res, next) {
        try {
            const countdown = await prisma.countdown.findFirst({
              orderBy: { id: 'desc' }
            });

            if (!countdown) {
              return res.status(404).json({ error: 'No countdown found' });
            }

            res.json({ message: "Countdown end date", data: countdown.date });
        } catch (error) {
            next(error);
        }
    }

    async createCountdown(req, res, next) {
        try {
            const {date} = req.body;

            const countdown = await prisma.countdown.create({ data: {date: new Date(date), status: false} })

            return res.json({ message: "Countdown created", data: countdown });
        } catch (error) {
            next(error);
        }
    }

    async updateCountdown(req, res, next) {
        try {
            const { date, status } = req.body;

            if (!date) {
              return res.status(400).json({ error: 'Date is required' });
            }

            const newDate = new Date(date);

            if (isNaN(newDate.getTime())) {
              return res.json({ error: 'Invalid date format' });
            }

            const countdown = await prisma.countdown.findFirst()

            const updatedCountdown = await prisma.countdown.update({
                where: {
                    id: countdown.id
                },
                data: {
                    date: newDate,
                    status: status
                }
            })

            res.json({ message: "Countdown end date updated", data: updatedCountdown });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CountdownController();