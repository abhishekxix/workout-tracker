const express = require('express');
const { authentication } = require('../middleware');
const {
  me,
  updateName,
  updateEmail,
  updatePassword,
} = require('../controllers/user');

const userRouter = express.Router();
userRouter.use(authentication);

userRouter.route('/me').get(me);
userRouter.route('/').patch(updateName);
userRouter.route('/updateEmail').patch(updateEmail);
userRouter.route('/updatePassword').patch(updatePassword);

module.exports = userRouter;
