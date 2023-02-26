const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../errors');
const { User } = require('../../models');
const { sendVerificationMail } = require('../../utils');

const updateEmail = async (req, res) => {
  let { user: tokenUser } = res.locals;
  const { email } = req.body;

  if (!email) throw new BadRequestError('please provide an email address.');

  const user = await User.findById(tokenUser.userID);

  user.email = email;
  user.isEmailVerified = false;
  await user.save();

  await sendVerificationMail(user);

  res
    .status(StatusCodes.ACCEPTED)
    .json({ msg: 'please verify your email address.' });
};

module.exports = updateEmail;
