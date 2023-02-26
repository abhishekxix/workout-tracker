const { UnauthorizedError } = require('../errors');
const jwt = require('jsonwebtoken');
const { createTokenUser } = require('../utils');

const authentication = async (req, res, next) => {
  const { authToken } = req.signedCookies;

  if (!authToken)
    throw new UnauthorizedError(
      'you need to be logged in to perform this action.',
    );

  let tokenUser = null;

  try {
    tokenUser = createTokenUser(jwt.verify(authToken, process.env.JWT_SECRET));
  } catch (error) {
    throw new UnauthorizedError('invalid token.');
  }

  res.locals.user = tokenUser;

  next();
};

module.exports = authentication;
