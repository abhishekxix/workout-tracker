const express = require('express');
const { createLift, getLifts, getLift } = require('../controllers/lift');
const { authentication } = require('../middleware');

const liftRouter = express.Router();

liftRouter.use(authentication);

liftRouter.route('/').post(createLift).get(getLifts);
liftRouter.route('/:liftID').get(getLift);
module.exports = liftRouter;
