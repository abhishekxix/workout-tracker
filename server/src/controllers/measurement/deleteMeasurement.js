const { StatusCodes } = require('http-status-codes');
const { Measurement } = require('../../models');

const deleteMeasurement = async (req, res) => {
  const { measurementID } = req.params;
  const { user } = res.locals;

  await Measurement.deleteOne({ _id: measurementID, userID: user.userID });

  res.status(StatusCodes.OK).json({
    msg: 'success',
  });
};

module.exports = deleteMeasurement;
