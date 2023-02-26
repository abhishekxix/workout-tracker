const jwt = require('jsonwebtoken');

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = verifyJWT;
