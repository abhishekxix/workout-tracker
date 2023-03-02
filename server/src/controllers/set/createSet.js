const { StatusCodes } = require('http-status-codes');
const { Set } = require('../../models');

const createSet = async (req, res) => {
  const { liftID, weight, reps } = req.body;
  const {
    user: { userID },
  } = res.locals;

  const set = await Set.create({
    liftID,
    weight,
    reps,
    userID,
  });

  res.status(StatusCodes.CREATED).json({
    msg: 'success',
    set: {
      liftID,
      weight,
      reps,
      userID,
      _id: set._id,
    },
  });
};

module.exports = createSet;
