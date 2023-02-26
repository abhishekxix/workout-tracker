const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../../errors');
const { User } = require('../../models');
const { sendVerificationMail } = require('../../utils');

const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) throw new BadRequestError('please provide email.');

  const user = await User.findOne({ email });

  if (!user) throw new NotFoundError(`no user found with email: ${email}.`);

  await sendVerificationMail(user, true);

  res
    .status(StatusCodes.OK)
    .json({ msg: `reset token sent to the registered email.` });
};

module.exports = resetPassword;
