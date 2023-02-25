const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { UnauthorizedError, BadRequestError } = require('../errors');
const { User } = require('../models');
const { createTokenUser, attachTokenCookie } = require('../utils');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  let payload = undefined;
  try {
    payload = jwt.verify(verificationToken, process.env.JWT_SECRET);
  } catch (error) {
    throw new UnauthorizedError('invalid verification token');
  }

  const user = await User.findOne({ email: payload.email });

  if (!user) throw new UnauthorizedError('invalid user');

  if (user.isEmailVerified)
    throw new BadRequestError('user is already verified');

  user.isEmailVerified = true;
  await user.save();

  const tokenUser = createTokenUser(user);
  attachTokenCookie(res, tokenUser);

  res.status(StatusCodes.OK).json({
    msg: 'email verification successful',
    user: tokenUser,
  });
};

module.exports = verifyEmail;
