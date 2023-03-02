const { StatusCodes } = require('http-status-codes');
const { NotFoundError, UnauthorizedError } = require('../../errors');
const { WorkoutSession, DailyStat } = require('../../models');

const updateWorkoutSession = async (req, res) => {
  const { dailyStatID, name, startTime, endTime } = req.body;
  const { workoutSessionID } = req.params;
  const { user } = res.locals;

  const workoutSession = await WorkoutSession.findOne(
    {
      _id: workoutSessionID,
      userID: user.userID,
    },
    { __v: 0 },
  );

  if (!workoutSession)
    throw new NotFoundError(
      `no workout session found with id: ${workoutSessionID}`,
    );

  if (dailyStatID) {
    const dailyStat = await DailyStat.findOne({
      userID: user.userID,
      _id: dailyStatID,
    });

    if (!dailyStat) throw new UnauthorizedError('invalid dailyStatID');
    workoutSession.dailyStatID = dailyStatID;
  }
  if (name) workoutSession.name = name;
  if (startTime) workoutSession.startTime = startTime;
  if (endTime) workoutSession.endTime = endTime;

  await workoutSession.save();

  res.status(StatusCodes.OK).json({
    msg: 'success',
    workoutSession,
  });
};

module.exports = updateWorkoutSession;
