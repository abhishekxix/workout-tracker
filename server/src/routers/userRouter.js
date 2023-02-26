const express = require('express');
const { authentication } = require('../middleware');
const { me } = require('../controllers/user');

const userRouter = express.Router();
userRouter.use(authentication);

userRouter.route('/me').get(me);

module.exports = userRouter;
