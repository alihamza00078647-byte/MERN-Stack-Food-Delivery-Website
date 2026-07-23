const express = require('express');
const orderRouter = express.Router();

const { placeOrder, verifyStripeOrder, userOrders, listOrder } = require('../Controller/orderController');
const { authMiddleware } = require('../Middleware/auth');


orderRouter.get('/list', listOrder);

orderRouter.post('/place', authMiddleware, placeOrder);

orderRouter.post('/verify', authMiddleware, verifyStripeOrder);

orderRouter.post('/userorders', authMiddleware, userOrders);



exports.orderRouter = orderRouter;