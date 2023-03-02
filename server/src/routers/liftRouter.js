const express = require('express');
const { createLift } = require('../controllers/lift');
const { authentication } = require('../middleware');

const liftRouter = express.Router();

liftRouter.use(authentication);

liftRouter.route('/').post(createLift);

module.exports = liftRouter;
