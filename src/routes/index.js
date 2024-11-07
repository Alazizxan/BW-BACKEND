const {Router} = require('express');
const userRouter = require("./users-router");
const taskRouter = require("./task-router");
const walletRouter = require("./wallet-router");
const countdownRouter = require("./countdown-router");

const errorMiddleware = require("../middlewares/error-middleware");

const router = new Router();


router.use('/users', userRouter);
router.use('/tasks', taskRouter);
router.use('/wallet', walletRouter);
router.use('/countdown', countdownRouter);
router.use(errorMiddleware)

module.exports = router;