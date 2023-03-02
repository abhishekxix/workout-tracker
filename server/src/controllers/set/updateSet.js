const { StatusCodes } = require('http-status-codes');
const { NotFoundError, UnauthorizedError } = require('../../errors');
const { Set, Lift } = require('../../models');

const updateSet = async (req, res) => {
  const { setID } = req.params;
  const {
    user: { userID },
  } = res.locals;
  const { liftID, weight, reps } = req.body;

  const set = await Set.findOne({ userID, _id: setID }, { __v: 0 });

  if (!set) throw new NotFoundError(`no set found with ID: ${setID}`);

  if (liftID) {
    const lift = await Lift.findOne({ _id: liftID, userID });

    if (!lift) throw new UnauthorizedError(`invalid liftID`);

    set.liftID = liftID;
  }

  if (weight) set.weight = weight;
  if (reps) set.reps = reps;

  await set.save();

  res.status(StatusCodes.OK).json({
    msg: 'success',
    set,
  });
};

module.exports = updateSet;
