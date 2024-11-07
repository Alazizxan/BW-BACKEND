const {Router } = require('express');
const { register } = require('../controllers/users-controller')

const userRouter = Router();

userRouter.post('/register', register);


module.exports = userRouter;