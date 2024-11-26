const {Router} = require('express');
const userRouter = require("./users-router");
const taskRouter = require("./task-router");
const walletRouter = require("./wallet-router");
const countdownRouter = require("./countdown-router");
const TopReferralsController = require('../controllers/topref-controller');
const AllUsersController = require("../controllers/AllUser-controller");
const errorMiddleware = require("../middlewares/error-middleware");
const userDetailsController = require("../controllers/useractivation-controller");
const router = new Router();


router.use('/users', userRouter);
router.use('/tasks', taskRouter);
router.use('/wallet', walletRouter);
router.use('/countdown', countdownRouter);
router.get('/top-referrals', TopReferralsController.getTopReferrals);
router.get('/alluseradm', AllUsersController.getAllUser);
router.get('/user/details/:telegramId', userDetailsController.getUserDetails);
router.use(errorMiddleware)

module.exports = router;