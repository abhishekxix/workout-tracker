const { UnauthorizedError } = require('../errors');
const { createTokenUser, verifyJWT } = require('../utils');

const authentication = async (req, res, next) => {
  const { authToken } = req.signedCookies;

  if (!authToken)
    throw new UnauthorizedError(
      'you need to be logged in to perform this action.',
    );

  let tokenUser = null;

  try {
    tokenUser = createTokenUser(verifyJWT(authToken));
  } catch (error) {
    throw new UnauthorizedError('invalid token.');
  }

  res.locals.user = tokenUser;

  next();
};

module.exports = authentication;
