const { StatusCodes } = require('http-status-codes');
const { CardioSession } = require('../../models');

const getCardioSessions = async (req, res) => {
  const { workoutSessionID } = req.query;
  const {
    user: { userID },
  } = res.locals;

  const queryObject = { userID };

  if (workoutSessionID) queryObject.workoutSessionID = workoutSessionID;

  const cardioSessions = await CardioSession.find(queryObject, { __v: 0 });

  res.status(StatusCodes.OK).json({ msg: 'success', cardioSessions });
};

module.exports = getCardioSessions;
