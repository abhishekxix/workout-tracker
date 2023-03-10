const express = require('express');
const {
  registerUser,
  verifyEmail,
  login,
  logout,
  resetPassword,
  verifyAndResetPassword,
} = require('../controllers/auth');

const authRouter = express.Router();

authRouter.route('/registerUser').post(registerUser);
authRouter.route('/verifyEmail/:verificationToken').get(verifyEmail);
authRouter.route('/login').post(login);
authRouter.route('/logout').get(logout);
authRouter
  .route('/resetPassword')
  .post(resetPassword)
  .patch(verifyAndResetPassword);

module.exports = authRouter;
