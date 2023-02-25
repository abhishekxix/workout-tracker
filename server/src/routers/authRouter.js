const express = require('express');
const { registerUser } = require('../controllers');

const authRouter = express.Router();

authRouter.route('/registerUser').post(registerUser);

module.exports = authRouter;
