const { StatusCodes } = require('http-status-codes');
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require('../../errors');
const { User } = require('../../models');

const updatePassword = async (req, res) => {
  let { user: tokenUser } = res.locals;
  const { currentPassword, newPassword } = req.body;

  if (!(currentPassword && newPassword))
    throw new BadRequestError('please provide both current and new passwords.');

  const user = await User.findById(tokenUser.userID);
  if (!user)
    throw new NotFoundError(`No user found with id: ${tokenUser.userID}`);

  const isOldPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isOldPasswordCorrect) {
    res.clearCookie('authToken');
    throw new UnauthorizedError('incorrect current password.');
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'password updated successfully.' });
};

module.exports = updatePassword;
