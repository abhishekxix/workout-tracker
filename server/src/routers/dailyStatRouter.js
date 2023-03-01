const express = require('express');
const { authentication } = require('../middleware');
const {
  create,
  getDailyStats,
  getDailyStat,
} = require('../controllers/dailyStat');

const dailyStatRouter = express.Router();

dailyStatRouter.use(authentication);

dailyStatRouter.post('/create', create);
dailyStatRouter.route('/').get(getDailyStats);
dailyStatRouter.route('/:dailyStatID').get(getDailyStat);

module.exports = dailyStatRouter;
