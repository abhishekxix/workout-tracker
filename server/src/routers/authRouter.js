const express = require('express');
const { registerUser, verifyEmail, login, logout } = require('../controllers');

const authRouter = express.Router();

authRouter.route('/registerUser').post(registerUser);
authRouter.route('/verifyEmail/:verificationToken').get(verifyEmail);
authRouter.route('/login').post(login);
authRouter.route('/logout').get(logout);

module.exports = authRouter;
