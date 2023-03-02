const { StatusCodes } = require('http-status-codes');
const { CardioSession } = require('../../models');

const deleteCardioSession = async (req, res) => {
  const { cardioSessionID } = req.params;
  const {
    user: { userID },
  } = res.locals;

  await CardioSession.deleteOne({ _id: cardioSessionID, userID });

  res.status(StatusCodes.OK).json({
    msg: 'success',
  });
};

module.exports = deleteCardioSession;
