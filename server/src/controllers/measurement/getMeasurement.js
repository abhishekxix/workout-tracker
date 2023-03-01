const { StatusCodes } = require('http-status-codes');
const { Measurement } = require('../../models');

const getMeasurement = async (req, res) => {
  const { measurementID } = req.params;
  const { user } = res.locals;

  const measurement = await Measurement.findOne(
    {
      _id: measurementID,
      userID: user.userID,
    },
    { __v: 0 },
  );

  res.status(StatusCodes.OK).json({ msg: 'success', measurement });
};

module.exports = getMeasurement;
