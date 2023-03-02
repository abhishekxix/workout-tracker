const { StatusCodes } = require('http-status-codes');
const { UnauthorizedError, NotFoundError } = require('../../errors');
const { WorkoutSession, Lift } = require('../../models');

const updateLift = async (req, res) => {
  const { workoutSessionID, name, type } = req.body;
  const { liftID } = req.params;
  const {
    user: { userID },
  } = res.locals;

  const lift = await Lift.findOne({ _id: liftID, userID }, { __v: 0 });

  if (!lift) throw new NotFoundError(`no lift found with ID: ${liftID}`);

  if (workoutSessionID) {
    const workoutSession = await WorkoutSession.findOne({
      _id: workoutSessionID,
      userID,
    });

    if (!workoutSession)
      throw new UnauthorizedError('invalid workout session ID');

    lift.workoutSessionID = workoutSessionID;
  }

  if (name) lift.name = name;
  if (type) lift.type = type;

  await lift.save();

  res.status(StatusCodes.OK).json({
    msg: 'success',
    lift,
  });
};

module.exports = updateLift;
