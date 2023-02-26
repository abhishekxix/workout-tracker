const express = require('express');
const { authentication } = require('../middleware');
const { me, updateName } = require('../controllers/user');

const userRouter = express.Router();
userRouter.use(authentication);

userRouter.route('/me').get(me);
userRouter.route('/').patch(updateName);

module.exports = userRouter;
