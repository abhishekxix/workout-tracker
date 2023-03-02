const { StatusCodes } = require('http-status-codes');
const { Lift } = require('../../models');

const getLifts = async (req, res) => {
  const { workoutSessionID } = req.query;
  const {
    user: { userID },
  } = res.locals;

  const queryObject = { userID };
  if (workoutSessionID) queryObject.workoutSessionID = workoutSessionID;

  const lifts = await Lift.find(queryObject, { __v: 0 });

  res.status(StatusCodes.OK).json({
    msg: 'success',
    lifts,
  });
};

module.exports = getLifts;
