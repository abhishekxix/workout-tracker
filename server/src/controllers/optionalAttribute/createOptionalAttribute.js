const { StatusCodes } = require('http-status-codes');
const { UnauthorizedError } = require('../../errors');
const { CardioSession, OptionalAttribute } = require('../../models');

const createOptionalAttribute = async (req, res) => {
  const { key, value, cardioSessionID } = req.body;
  const {
    user: { userID },
  } = res.locals;

  const cardioSession = await CardioSession.findOne({
    _id: cardioSessionID,
    userID,
  });

  if (!cardioSession) throw new UnauthorizedError('invalid cardioSessionID');

  const optionalAttribute = await OptionalAttribute.create({
    key,
    value,
    cardioSessionID,
    userID,
  });

  res.status(StatusCodes.OK).json({
    msg: 'success',
    optionalAttribute: {
      key,
      value,
      cardioSessionID,
      userID,
      _id: optionalAttribute._id,
    },
  });
};

module.exports = createOptionalAttribute;
