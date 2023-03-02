const { StatusCodes } = require('http-status-codes');
const { Lift } = require('../../models');

const deleteLift = async (req, res) => {
  const { liftID } = req.params;
  const {
    user: { userID },
  } = res.locals;

  await Lift.deleteOne({ _id: liftID, userID });

  res.status(StatusCodes.OK).json({
    msg: 'success',
  });
};

module.exports = deleteLift;
