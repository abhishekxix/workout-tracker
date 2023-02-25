const { StatusCodes } = require('http-status-codes');

const logout = async (req, res) => {
  res.clearCookie('authToken');
  res.status(StatusCodes.OK).json({ msg: 'logged out successfully.' });
};

module.exports = logout;
