const express = require('express');
const { registerUser, verifyEmail } = require('../controllers');

const authRouter = express.Router();

authRouter.route('/registerUser').post(registerUser);
authRouter.route('/verifyEmail/:verificationToken').get(verifyEmail);

module.exports = authRouter;
