const { StatusCodes } = require('http-status-codes');
const { UnauthorizedError, NotFoundError } = require('../../errors');
const { CardioSession, WorkoutSession } = require('../../models');

const updateCardioSession = async (req, res) => {
  const { cardioSessionID } = req.params;
  const { name, duration, workoutSessionID } = req.body;
  const {
    user: { userID },
  } = res.locals;

  const cardioSession = await CardioSession.findOne(
    {
      _id: cardioSessionID,
      userID,
    },
    { __v: 0 },
  );

  if (!cardioSession)
    throw new NotFoundError(
      `no cardio session found with ID: ${cardioSessionID}`,
    );

  if (workoutSessionID) {
    const workoutSession = await WorkoutSession.findOne({
      _id: workoutSessionID,
      userID,
    });

    if (!workoutSession)
      throw new UnauthorizedError('invalid workoutSessionID');

    cardioSession.workoutSessionID = workoutSessionID;
  }

  if (name) cardioSession.name = name;
  if (duration) cardioSession.duration = duration;

  await cardioSession.save();

  res.status(StatusCodes.OK).json({
    msg: 'success',
    cardioSession,
  });
};

module.exports = updateCardioSession;
