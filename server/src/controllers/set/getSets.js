const { StatusCodes } = require('http-status-codes');
const { Set } = require('../../models');

const getSets = async (req, res) => {
  const { liftID } = req.query;
  const {
    user: { userID },
  } = res.locals;

  const queryObject = { userID };

  if (liftID) queryObject.liftID = liftID;

  const sets = await Set.find(queryObject, { __v: 0 });

  res.status(StatusCodes.OK).json({
    msg: 'success',
    sets,
  });
};

module.exports = getSets;
