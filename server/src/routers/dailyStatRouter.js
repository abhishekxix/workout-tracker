const express = require('express');
const { authentication } = require('../middleware');
const {
  create,
  getDailyStats,
  getDailyStat,
  updateDailyStat,
  deleteDailyStat,
} = require('../controllers/dailyStat');

const dailyStatRouter = express.Router();

dailyStatRouter.use(authentication);

dailyStatRouter.post('/create', create);
dailyStatRouter.route('/').get(getDailyStats);
dailyStatRouter
  .route('/:dailyStatID')
  .get(getDailyStat)
  .patch(updateDailyStat)
  .delete(deleteDailyStat);

module.exports = dailyStatRouter;
