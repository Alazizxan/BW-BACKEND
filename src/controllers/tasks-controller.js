const prisma = require('../utils/prisma');
const ApiError = require('../errors/api-erros')

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
            const tasks = await prisma.task.findMany();
            const user = await prisma.user.findFirst({ where: { telegramId: req.params.telegramId.toString() } });

            if (!user) return res.json({ message: "Tasks", data: {passedTasks: [], tasks: tasks }});

            const passedTasks = await prisma.userTask.findMany({
                where: { userId: req.params.id }
            });


            const passedTaskIds = new Set(passedTasks.map(task => task.taskId));

            const data = {
                passedTasks: [],
                tasks: []
            };

            tasks.forEach(task => {
                if (passedTaskIds.has(task.id)) {
                    data.passedTasks.push(task);
                } else {
                    data.tasks.push(task);
                }
            });

            return res.json({ message: "Tasks", data });
        } catch (error) {
            next(error);
        }
    }

    // pass task
    async passTask(req, res, next) {
        try {
            const { taskId, telegramId } = req.body

            const task = await prisma.task.findFirst({ where: {id: taskId} })
            const user = await prisma.user.findFirst({where: {telegramId: telegramId.toString()} });

            if (!task || !user) throw ApiError.BadRequest('Task not found')

            const passedTask = await prisma.userTask.create({ data: { taskId: taskId, userId: user.id } })

            return res.json({ message: "Task passed", data: passedTask });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new TasksController()
