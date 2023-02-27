const nodemailer = require('nodemailer');
const createTokenUser = require('./createTokenUser');
const createJWT = require('./createJWT');
const { constants } = require('../constants');

const sendVerificationMail = async (user, mailType) => {
  const tokenUser = createTokenUser(user);
  const verificationToken = createJWT(
    tokenUser,
    process.env.JWT_VERIFICATION_LIFETIME,
  );

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"No reply <verification@worrkout-tracker>"`,
    to: tokenUser.email,
    subject:
      mailType === constants.mailType.PASSWORD_RESET
        ? 'Reset Password'
        : mailType === constants.mailType.DELETE_ACCOUNT
        ? 'Delete Account'
        : 'Verify your email address',
    html: `${
      mailType === constants.mailType.PASSWORD_RESET
        ? 'Enter this token to reset password'
        : mailType === constants.mailType.DELETE_ACCOUNT
        ? 'Enter this token to delete your account'
        : 'Here is your auth token'
    }: <br/>
    <code>${verificationToken} </code>`,
  });
};

module.exports = sendVerificationMail;
