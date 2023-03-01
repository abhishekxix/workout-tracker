const { StatusCodes } = require('http-status-codes');
const { WorkoutSession } = require('../../models');

const getWorkoutSession = async (req, res) => {
  const { workoutSessionID } = req.params;
  const { user } = res.locals;

  const workoutSession = await WorkoutSession.findOne(
    {
      _id: workoutSessionID,
      userID: user.userID,
    },
    { __v: 0 },
  );

  res.status(StatusCodes.OK).json({
    msg: 'success',
    workoutSession,
  });
};

module.exports = getWorkoutSession;
