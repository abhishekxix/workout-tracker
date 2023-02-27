const { StatusCodes } = require('http-status-codes');
const { DailyStat } = require('../../models');

const getDailyStats = async (req, res) => {
  const { user } = res.locals;

  const dailyStats = await DailyStat.find({ userID: user.userID }, { __v: 0 });

  res.status(StatusCodes.OK).json({
    msg: 'success',
    dailyStats: dailyStats,
  });
};

module.exports = getDailyStats;
