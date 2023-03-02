const { StatusCodes } = require('http-status-codes');
const { NotFoundError, UnauthorizedError } = require('../../errors');
const { OptionalAttribute, CardioSession } = require('../../models');

const updateOptionalAttribute = async (req, res) => {
  const { key, value, cardioSessionID } = req.body;
  const { optionalAttributeID } = req.params;
  const {
    user: { userID },
  } = res.locals;

  const optionalAttribute = await OptionalAttribute.findOne(
    {
      _id: optionalAttributeID,
      userID,
    },
    { __v: 0 },
  );

  if (!optionalAttribute)
    throw new NotFoundError(
      `no optional attribute found with ID: ${optionalAttributeID}`,
    );

  if (cardioSessionID) {
    const cardioSession = await CardioSession.findOne({
      userID,
      _id: cardioSessionID,
    });

    if (!cardioSession) throw new UnauthorizedError('invalid cardioSessionID');

    optionalAttribute.cardioSessionID = cardioSessionID;
  }

  if (key) optionalAttribute.key = key;
  if (value) optionalAttribute.value = value;

  await optionalAttribute.save();

  res.status(StatusCodes.OK).json({
    msg: 'success',
    optionalAttribute,
  });
};

module.exports = updateOptionalAttribute;
