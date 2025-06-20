const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const {protect} = require('../middleware/userauth');

router.get("/data", protect, userController.getUsersdata);

module.exports = router;