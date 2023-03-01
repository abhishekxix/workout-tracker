const express = require('express');
const { create } = require('../controllers/measurement');
const { authentication } = require('../middleware');

const measurementRouter = express.Router();

measurementRouter.use(authentication);

measurementRouter.route('/').post(create);

module.exports = measurementRouter;
