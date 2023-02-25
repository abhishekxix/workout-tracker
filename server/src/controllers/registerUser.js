const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');
const { sendVerificationMail } = require('../utils');

const registerUser = async (req, res) => {
  const { name, email, password, region } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    region,
  });

  await sendVerificationMail(user);

  res.status(StatusCodes.CREATED).json({ msg: 'Please verify your email.' });
};

module.exports = registerUser;
