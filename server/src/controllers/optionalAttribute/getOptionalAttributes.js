const { StatusCodes } = require('http-status-codes');
const { OptionalAttribute } = require('../../models');

const getOptionalAttributes = async (req, res) => {
  const { cardioSessionID } = req.query;
  const {
    user: { userID },
  } = res.locals;

  const optionalAttributes = await OptionalAttribute.find(
    {
      userID,
      cardioSessionID,
    },
    { __v: 0 },
  );

  res.status(StatusCodes.OK).json({
    msg: 'success',
    optionalAttributes,
  });
};

module.exports = getOptionalAttributes;
