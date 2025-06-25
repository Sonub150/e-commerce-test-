const express = require('express');
const checkoutController = require('../controller/chackout.controller');

const router = express.Router();

// Use the checkout controller routes directly
module.exports = checkoutController;
