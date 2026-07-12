const express = require('express');
const userRouter = express.Router();

const { registerUser, loginUser } = require('../Controller/userController');


userRouter.post('/login', loginUser);

userRouter.post('/register', registerUser);



exports.userRouter = userRouter;