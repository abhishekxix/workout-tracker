const { StatusCodes } = require('http-status-codes');
const { Lift } = require('../../models');

const getLift = async (req, res) => {
  const { liftID } = req.params;
  const {
    user: { userID },
  } = res.locals;

  const lift = await Lift.findOne({ _id: liftID, userID }, { __v: 0 });

  res.status(StatusCodes.OK).json({
    msg: 'success',
    lift,
  });
};

module.exports = getLift;
