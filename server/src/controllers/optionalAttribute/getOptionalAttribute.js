const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../../errors');
const { OptionalAttribute } = require('../../models');

const getOptionalAttribute = async (req, res) => {
  const { optionalAttributeID } = req.params;
  const {
    user: { userID },
  } = res.locals;

  const optionalAttribute = await OptionalAttribute.findOne(
    {
      userID,
      _id: optionalAttributeID,
    },
    { __v: 0 },
  );

  if (!optionalAttribute)
    throw new NotFoundError(
      `no optional attribute found with ID: ${optionalAttributeID}`,
    );

  res.status(StatusCodes.OK).json({
    msg: 'success',
    optionalAttribute,
  });
};

module.exports = getOptionalAttribute;
