const { StatusCodes } = require('http-status-codes');
const { Measurement } = require('../../models');

const getMeasurements = async (req, res) => {
  const { dailyStatID } = req.query;
  const { user } = res.locals;
  let queryObject = { userID: user.userID };

  if (dailyStatID) queryObject = { ...queryObject, dailyStatID };

  const measurements = await Measurement.find(queryObject, { __v: 0 });

  res.status(StatusCodes.OK).json({
    msg: 'success',
    measurements,
  });
};

module.exports = getMeasurements;
