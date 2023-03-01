const express = require('express');
const {
  create,
  getMeasurements,
  getMeasurement,
  updateMeasurement,
  deleteMeasurement,
} = require('../controllers/measurement');
const { authentication } = require('../middleware');

const measurementRouter = express.Router();

measurementRouter.use(authentication);

measurementRouter.route('/').post(create).get(getMeasurements);
measurementRouter
  .route('/:measurementID')
  .get(getMeasurement)
  .patch(updateMeasurement)
  .delete(deleteMeasurement);

module.exports = measurementRouter;
