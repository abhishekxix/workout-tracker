const { StatusCodes } = require('http-status-codes');
const { DailyStat } = require('../../models');

const deleteDailyStat = async (req, res) => {
  const { dailyStatID } = req.params;

  await DailyStat.findByIdAndDelete(dailyStatID);

  res.status(StatusCodes.OK).json({
    msg: 'success',
  });
};

module.exports = deleteDailyStat;
