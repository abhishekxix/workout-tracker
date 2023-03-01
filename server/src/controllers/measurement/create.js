const { StatusCodes } = require('http-status-codes');
const { Measurement } = require('../../models');

const create = async (req, res) => {
  const { dailyStatID, bodyPart, measurement } = req.body;
  const { user } = res.locals;

  const createdMeasurement = await Measurement.create({
    dailyStatID,
    bodyPart,
    measurement,
    userID: user.userID,
  });

  res.status(StatusCodes.OK).json({
    msg: 'success',
    measurement: {
      dailyStatID,
      bodyPart,
      measurement,
      userID: user.userID,
      _id: createdMeasurement._id,
    },
  });
};

module.exports = create;
