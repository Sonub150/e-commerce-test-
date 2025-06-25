const express = require('express');
const Order = require('../models/ordermodules');
const { protect } = require('../middleware/userauth');
const Ordercontroller = require('../controller/order.controller');

const router = express.Router();

// Use the checkout controller routes
router.get('/my-orders', protect, Ordercontroller.Orders );
router.post('/:id', protect, Ordercontroller.orderDetail );

module.exports = router;
