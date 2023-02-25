const express = require('express');
const { registerUser, verifyEmail, login } = require('../controllers');

const authRouter = express.Router();

authRouter.route('/registerUser').post(registerUser);
authRouter.route('/verifyEmail/:verificationToken').get(verifyEmail);
authRouter.route('/login').post(login);

module.exports = authRouter;
