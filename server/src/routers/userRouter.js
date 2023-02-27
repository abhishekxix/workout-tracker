const express = require('express');
const { authentication } = require('../middleware');
const {
  me,
  updateName,
  updateEmail,
  updatePassword,
  deleteAccount,
  verifyAccountDeletion,
} = require('../controllers/user');

const userRouter = express.Router();
userRouter.use(authentication);

userRouter.route('/me').get(me);
userRouter.route('/').patch(updateName);
userRouter.route('/updateEmail').patch(updateEmail);
userRouter.route('/updatePassword').patch(updatePassword);
userRouter.route('/delete').post(deleteAccount).delete(verifyAccountDeletion);

module.exports = userRouter;
