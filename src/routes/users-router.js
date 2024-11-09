const {Router } = require('express');
const { register, friends } = require('../controllers/users-controller')

const userRouter = Router();

userRouter.post('/register', register);
userRouter.get('/friends/:id', friends)

module.exports = userRouter;