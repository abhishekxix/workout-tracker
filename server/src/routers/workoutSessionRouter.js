const express = require('express');
const {
  create,
  getWorkoutSessions,
  getWorkoutSession,
  updateWorkoutSession,
} = require('../controllers/workoutSession');
const { authentication } = require('../middleware');

const workoutSessionRouter = express.Router();
workoutSessionRouter.use(authentication);

workoutSessionRouter.route('/').post(create).get(getWorkoutSessions);
workoutSessionRouter
  .route('/:workoutSessionID')
  .get(getWorkoutSession)
  .patch(updateWorkoutSession);

module.exports = workoutSessionRouter;
