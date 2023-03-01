const express = require('express');
const { create, getWorkoutSessions } = require('../controllers/workoutSession');
const { authentication } = require('../middleware');

const workoutSessionRouter = express.Router();
workoutSessionRouter.use(authentication);

workoutSessionRouter.route('/').post(create).get(getWorkoutSessions);

module.exports = workoutSessionRouter;
