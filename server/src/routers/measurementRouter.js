const express = require('express');
const {
  create,
  getMeasurements,
  getMeasurement,
} = require('../controllers/measurement');
const { authentication } = require('../middleware');

const measurementRouter = express.Router();

measurementRouter.use(authentication);

measurementRouter.route('/').post(create).get(getMeasurements);
measurementRouter.route('/:measurementID').get(getMeasurement);

module.exports = measurementRouter;
