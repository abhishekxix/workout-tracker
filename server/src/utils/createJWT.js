const jwt = require('jsonwebtoken');

const createJWT = (payload, lifetime) => {
  const verificationToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: lifetime,
  });

  return verificationToken;
};

module.exports = createJWT;
