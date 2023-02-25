const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { UnauthorizedError, BadRequestError } = require('../errors');
const { User } = require('../models');

const verifyAndResetPassword = async (req, res) => {
  const { verificationToken, newPassword } = req.body;

  let payload = undefined;

  try {
    payload = jwt.verify(verificationToken, process.env.JWT_SECRET);
  } catch (error) {
    throw new UnauthorizedError('invalid verification token.');
  }

  const user = await User.findById(payload.userID);

  if (newPassword.length < 6) {
    throw BadRequestError('Password length should be atleast 6 characters.');
  }

  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: 'Password changed successfully.' });
};

module.exports = verifyAndResetPassword;
