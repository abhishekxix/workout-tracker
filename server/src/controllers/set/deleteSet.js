const { StatusCodes } = require('http-status-codes');
const { Set } = require('../../models');

const deleteSet = async (req, res) => {
  const { setID } = req.params;
  const {
    user: { userID },
  } = res.locals;

  await Set.deleteOne({ _id: setID, userID });

  res.status(StatusCodes.OK).json({
    msg: 'success',
  });
};

module.exports = deleteSet;
