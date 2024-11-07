const {Router } = require('express');
const {create, tasks, passTask} = require('../controllers/tasks-controller')

const taskRouter = Router();

taskRouter.post('/create', create);
taskRouter.post('/pass', passTask);
taskRouter.get('/all/:telegramId', tasks);


module.exports = taskRouter;