const { StatusCodes } = require('http-status-codes');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../errors');
const { User } = require('../models');
const {
  sendVerificationMail,
  createTokenUser,
  attachTokenCookie,
} = require('../utils');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password))
    throw new BadRequestError('please provide both email and password.');

  const user = await User.findOne({ email });

  if (!user) throw new NotFoundError(`no user with email: ${email} found.`);

  if (!(await user.comparePassword(password)))
    throw new UnauthorizedError('incorrect password.');

  if (!user.isEmailVerified) {
    sendVerificationMail(user);
    throw new UnauthorizedError(
      'please verify your email id before you log in.',
    );
  }

  const tokenUser = createTokenUser(user);
  attachTokenCookie(res, tokenUser);

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

module.exports = login;
