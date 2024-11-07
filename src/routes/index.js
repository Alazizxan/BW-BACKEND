const {Router} = require('express');
const userRouter = require("./users-router");
const taskRouter = require("./task-router");
const errorMiddleware = require("../middlewares/error-middleware");

const router = new Router();


router.use('/users', userRouter);
router.use('/tasks', taskRouter);
router.use(errorMiddleware)

module.exports = router;