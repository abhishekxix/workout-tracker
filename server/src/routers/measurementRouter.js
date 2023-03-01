const express = require('express');
const { create, getMeasurements } = require('../controllers/measurement');
const { authentication } = require('../middleware');

const measurementRouter = express.Router();

measurementRouter.use(authentication);

measurementRouter.route('/').post(create).get(getMeasurements);

module.exports = measurementRouter;
