const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController'); // ✅ Fix the missing import
const userAuth = require('../middleware/userauth'); // adjust path if needed

userRouter.get("/data", userAuth, userController.getUsersdata);

module.exports = userRouter;
