const express = require('express');
const userRouter = express.Router();

const { registerUser, loginUser } = require('../Controller/userController');


userRouter.get('/login', loginUser);

userRouter.get('/register', registerUser);



exports.userRouter = userRouter;