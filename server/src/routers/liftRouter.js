const express = require('express');
const { createLift, getLifts } = require('../controllers/lift');
const { authentication } = require('../middleware');

const liftRouter = express.Router();

liftRouter.use(authentication);

liftRouter.route('/').post(createLift).get(getLifts);

module.exports = liftRouter;
