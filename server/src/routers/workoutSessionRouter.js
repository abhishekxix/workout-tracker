const express = require('express');
const { create } = require('../controllers/workoutSession');
const { authentication } = require('../middleware');

const workoutSessionRouter = express.Router();
workoutSessionRouter.use(authentication);

workoutSessionRouter.route('/').post(create);

module.exports = workoutSessionRouter;
