const { StatusCodes } = require('http-status-codes');
const { WorkoutSession } = require('../../models');

const deleteWorkoutSession = async (req, res) => {
  const { workoutSessionID } = req.params;
  const { user } = res.locals;

  await WorkoutSession.deleteOne({
    _id: workoutSessionID,
    userID: user.userID,
  });

  res.status(StatusCodes.OK).json({
    msg: 'success',
  });
};

module.exports = deleteWorkoutSession;
