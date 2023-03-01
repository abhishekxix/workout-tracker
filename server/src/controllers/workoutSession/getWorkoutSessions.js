const { StatusCodes } = require('http-status-codes');
const { WorkoutSession } = require('../../models');

const getWorkoutSessions = async (req, res) => {
  const { dailyStatID } = req.query;
  const { user } = res.locals;

  let queryObject = { userID: user.userID };

  if (dailyStatID) queryObject = { ...queryObject, dailyStatID };

  const workoutSessions = await WorkoutSession.find(queryObject, { __v: 0 });

  res.status(StatusCodes.OK).json({
    msg: 'success',
    workoutSessions,
  });
};

module.exports = getWorkoutSessions;
