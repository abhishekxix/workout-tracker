const { StatusCodes } = require('http-status-codes');
const { WorkoutSession } = require('../../models');

const create = async (req, res) => {
  const { dailyStatID, name, startTime, endTime } = req.body;
  const { user } = res.locals;

  const workoutSession = await WorkoutSession.create({
    dailyStatID,
    userID: user.userID,
    name,
    startTime,
    endTime,
  });

  res.status(StatusCodes.CREATED).json({
    msg: 'created',
    workoutSession: {
      dailyStatID,
      userID: workoutSession.userID,
      name,
      startTime,
      endTime,
    },
  });
};

module.exports = create;
