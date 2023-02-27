const { StatusCodes } = require('http-status-codes');
const { User } = require('../../models');
const { NotFoundError, UnauthorizedError } = require('../../errors');
const { sendVerificationMail } = require('../../utils');
const { constants } = require('../../constants');

const deleteAccount = async (req, res) => {
  const { user: tokenUser } = res.locals;
  const { password } = req.body;

  const user = await User.findById(tokenUser.userID);

  if (!user)
    throw new NotFoundError(`no user found with id: ${tokenUser.userID}`);

  if (!password) throw new UnauthorizedError('please provide the password.');

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) throw new UnauthorizedError('invalid password.');

  user.isDeletionVerified = true;
  await user.save();

  await sendVerificationMail(user, constants.mailType.DELETE_ACCOUNT);

  res.status(StatusCodes.OK).json({
    msg: 'verification token for account deletion sent to the registered email.',
  });
};

module.exports = deleteAccount;
