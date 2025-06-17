
const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const userAuth = require('../middleware/userauth.js');


// Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/send-otp',userAuth, authController.sendOtp);
router.post('/verify-email',userAuth, authController.verifyEmail);
router.post('/user-authenticated', userAuth,authController.userAuthenticated);
router.post('/send-reset-otp', authController.sendResetotp);
router.post('/reset-password', authController.resetUserPassword);

module.exports = router;
