const { StatusCodes } = require('http-status-codes');
const { DailyStat } = require('../../models');

const deleteDailyStat = async (req, res) => {
  const { dailyStatID } = req.params;
  const {
    user: { userID },
  } = res.locals;

  await DailyStat.deleteOne({ _id: dailyStatID, userID });

  res.status(StatusCodes.OK).json({
    msg: 'success',
  });
};

module.exports = deleteDailyStat;
