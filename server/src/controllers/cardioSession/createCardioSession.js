const { StatusCodes } = require('http-status-codes');
const { UnauthorizedError } = require('../../errors');
const { WorkoutSession, CardioSession } = require('../../models');

const createCardioSession = async (req, res) => {
  const { name, duration, workoutSessionID } = req.body;
  const {
    user: { userID },
  } = res.locals;

  const workoutSession = await WorkoutSession.findOne({
    userID,
    _id: workoutSessionID,
  });

  if (!workoutSession) throw new UnauthorizedError('invalid workoutSessionID.');

  const cardioSession = await CardioSession.create({
    name,
    duration,
    workoutSessionID,
    userID,
  });

  res.status(StatusCodes.OK).json({
    msg: 'success',
    cardioSession: {
      name,
      duration,
      workoutSessionID,
      userID,
      _id: cardioSession._id,
    },
  });
};

module.exports = createCardioSession;
