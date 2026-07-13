const express = require('express');
const orderRouter = express.Router();

const { placeOrder, verifyStripeOrder } = require('../Controller/orderController');
const { authMiddleware } = require('../Middleware/auth');


orderRouter.post('/place', authMiddleware, placeOrder);

orderRouter.post('/verify', authMiddleware, verifyStripeOrder);



exports.orderRouter = orderRouter;