const {Router} = require('express');
const userRouter = require("./users-router");
const taskRouter = require("./task-router");


const router = new Router();


router.use('/users', userRouter);
router.use('/tasks', taskRouter);

module.exports = router;