const {Router } = require('express');
const {create, tasks} = require('../controllers/tasks-controller')

const taskRouter = Router();

taskRouter.post('/create', create);
taskRouter.get('/all', tasks);


module.exports = taskRouter;