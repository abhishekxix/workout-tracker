const { DailyStat } = require('../../models');
const { NotFoundError } = require('../../errors');
const { StatusCodes } = require('http-status-codes');

const getDailyStat = async (req, res) => {
  const { dailyStatID } = req.params;
  const { user } = res.locals;

  const dailyStat = await DailyStat.findOne(
    {
      _id: dailyStatID,
      userID: user.userID,
    },
    {
      __v: 0,
    },
  );

  if (!dailyStat)
    throw new NotFoundError(`no daily stat found with id: ${dailyStatID}`);

  res.status(StatusCodes.OK).json({
    msg: 'success',
    dailyStat,
  });
};

module.exports = getDailyStat;
