const express = require('express');
const {
  create,
  getWorkoutSessions,
  getWorkoutSession,
} = require('../controllers/workoutSession');
const { authentication } = require('../middleware');

const workoutSessionRouter = express.Router();
workoutSessionRouter.use(authentication);

workoutSessionRouter.route('/').post(create).get(getWorkoutSessions);
workoutSessionRouter.route('/:workoutSessionID').get(getWorkoutSession);

module.exports = workoutSessionRouter;
