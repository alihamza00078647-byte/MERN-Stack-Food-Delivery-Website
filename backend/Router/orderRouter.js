const express = require('express');
const orderRouter = express.Router();

const authMiddleware = require('../Middleware/auth');
const { placeOrder } = require('../Controller/orderController');


orderRouter.post('/place', authMiddleware, placeOrder);



exports.orderRouter = orderRouter;