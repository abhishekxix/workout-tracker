const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthorizedError } = require('../../errors');
const { verifyJWT } = require('../../utils');
const { User } = require('../../models');

const verifyAccountDeletion = async (req, res) => {
  const { verificationToken } = req.body;
  const { user: tokenUser } = res.locals;

  if (!verificationToken)
    throw new BadRequestError('please provide the verification token.');

  let payload = null;

  try {
    payload = verifyJWT(verificationToken);
  } catch (error) {
    throw new UnauthorizedError('invalid verification token.');
  }

  if (tokenUser.userID !== payload.userID)
    throw new UnauthorizedError(
      'you are not authorized to delete this account.',
    );

  const user = await User.findById(tokenUser.userID);

  if (!user.isDeletionVerified)
    throw new UnauthorizedError('deletion is not authorized.');

  await User.deleteOne({ _id: tokenUser.userID });

  res.status(StatusCodes.OK).json({
    msg: 'account deleted successfully.',
  });
};

module.exports = verifyAccountDeletion;
