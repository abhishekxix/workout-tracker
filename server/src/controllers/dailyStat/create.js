const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../errors');
const { DailyStat } = require('../../models');

const create = async (req, res) => {
  const { user } = res.locals;
  const { date, weight } = req.body;

  if (!(date && weight))
    throw new BadRequestError('please provide both date and weight.');

  const dailyStat = await DailyStat.create({
    date,
    weight,
    userID: user.userID,
  });

  res.status(StatusCodes.CREATED).json({
    msg: 'daily stat created',
    dailyStat: {
      date,
      weight,
      userID: user.userID,
      _id: dailyStat._id,
    },
  });
};

module.exports = create;
