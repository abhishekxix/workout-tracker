const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../../errors');
const { CardioSession } = require('../../models');

const getCardioSession = async (req, res) => {
  const { cardioSessionID } = req.params;
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
      `No cardio session found with ID: ${cardioSessionID}`,
    );

  res.status(StatusCodes.OK).json({
    msg: 'success',
    cardioSession,
  });
};

module.exports = getCardioSession;
