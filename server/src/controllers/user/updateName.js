const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../errors');
const { User } = require('../../models');
const { createTokenUser, attachTokenCookie } = require('../../utils');

const updateName = async (req, res) => {
  let { user: tokenUser } = res.locals;
  const { name } = req.body;

  if (!name) throw new BadRequestError('please provide a name.');

  const user = await User.findById(tokenUser.userID);
  user.name = name;
  await user.save();

  tokenUser = createTokenUser(user);
  attachTokenCookie(res, tokenUser);

  res
    .status(StatusCodes.OK)
    .json({ msg: 'name update successful', user: tokenUser });
};

module.exports = updateName;
