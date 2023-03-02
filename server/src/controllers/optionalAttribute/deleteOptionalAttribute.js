const { StatusCodes } = require('http-status-codes');
const { OptionalAttribute } = require('../../models');

const deleteOptionalAttribute = async (req, res) => {
  const { optionalAttributeID } = req.params;
  const {
    user: { userID },
  } = res.locals;

  await OptionalAttribute.deleteOne({ _id: optionalAttributeID, userID });

  res.status(StatusCodes.OK).json({ msg: 'success' });
};

module.exports = deleteOptionalAttribute;
