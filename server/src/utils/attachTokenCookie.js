const createJWT = require('./createJWT');

const attachTokenCookie = (res, tokenUser) => {
  const authToken = createJWT(tokenUser, process.env.AUTH_TOKEN_LIFETIME);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('authToken', authToken, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

module.exports = attachTokenCookie;
