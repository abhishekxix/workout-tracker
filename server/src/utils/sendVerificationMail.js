const nodemailer = require('nodemailer');
const createTokenUser = require('./createTokenUser');
const createJWT = require('./createJWT');

const sendVerificationMail = async (user) => {
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
    subject: 'Verify your email address',
    html: `Here is your auth token: <br/>
    <code>${verificationToken} </code>`,
  });
};

module.exports = sendVerificationMail;
