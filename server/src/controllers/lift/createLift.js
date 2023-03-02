const { StatusCodes } = require('http-status-codes');
const { UnauthorizedError } = require('../../errors');
const { WorkoutSession, Lift } = require('../../models');

const createLift = async (req, res) => {
  const { workoutSessionID, type, name } = req.body;
  const { user } = res.locals;

  const workoutSession = await WorkoutSession.findOne({
    _id: workoutSessionID,
    userID: user.userID,
  });

  if (!workoutSession)
    throw new UnauthorizedError(
      'this workout session does not belong to the current user.',
    );

  const lift = await Lift.create({
    workoutSessionID,
    type,
    name,
    userID: user.userID,
  });
  res.status(StatusCodes.CREATED).json({
    msg: 'success',
    lift: {
      workoutSessionID,
      type,
      name,
      userID: user.userID,
      _id: lift._id,
    },
  });
};

module.exports = createLift;
