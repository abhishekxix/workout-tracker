const { StatusCodes } = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
const errorHandler = async (err, req, res, next) => {
  let customError = {
    statusCode: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong. Please try again later.',
  };

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.msg)
      .join(', ');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue,
    )} field, please choose another value.`;

    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with the id ${err.value}`;
    customError = StatusCodes.NOT_FOUND;
  }

  return res.status(customError.statusCode).json({ msg: err.message });
};

module.exports = errorHandler;
