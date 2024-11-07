const prisma = require('../utils/prisma');

class TasksController {
    async create(req, res, next) {
        try {
            const {title, description, cost} = req.body;

            const task = await prisma.task.create({
                data: {
                    title: title,
                    description: description,
                    cost: cost
                }
            })


            return res.json({message: "Task created", data: task});
        } catch (error) {
            next(error)
        }
    }

    // get tasks
    async tasks(req, res, next) {
        try {
            const tasks = await prisma.task.findMany()
            return res.json({ message: "Tasks", data: tasks })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new TasksController()
