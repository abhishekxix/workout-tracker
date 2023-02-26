const { StatusCodes } = require('http-status-codes');

const me = async (req, res) => {
  const { user } = res.locals;

  res.status(StatusCodes.OK).json({ user });
};

module.exports = me;
