const express = require('express');
const { AddToCart, removeFromCart, getCart } = require('../Controller/cartController');
const { authMiddleware } = require('../Middleware/auth');
const cartRouter = express.Router();



cartRouter.post('/add', authMiddleware, AddToCart);

cartRouter.post('/remove', authMiddleware, removeFromCart);

cartRouter.post('/get', authMiddleware, getCart);


exports.cartRouter = cartRouter;