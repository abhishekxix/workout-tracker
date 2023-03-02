const { StatusCodes } = require('http-status-codes');
const { NotFoundError, UnauthorizedError } = require('../../errors');
const { Measurement, DailyStat } = require('../../models');

const updateMeasurement = async (req, res) => {
  const { measurementID } = req.params;
  const { user } = res.locals;
  const { bodyPart, dailyStatID, measurement } = req.body;

  const documentToUpdate = await Measurement.findOne(
    {
      _id: measurementID,
      userID: user.userID,
    },
    { __v: 0 },
  );

  if (!documentToUpdate)
    throw new NotFoundError(`no measurement found with id: ${measurementID}`);

  if (bodyPart) documentToUpdate.bodyPart = bodyPart;
  if (dailyStatID) {
    const dailyStat = await DailyStat.findOne({
      _id: dailyStatID,
      userID: user.userID,
    });
    if (!dailyStat) throw new UnauthorizedError('invalid dailyStatID');
    documentToUpdate.dailyStatID = dailyStatID;
  }
  if (measurement) documentToUpdate.measurement = measurement;

  await documentToUpdate.save();

  res.status(StatusCodes.OK).json({
    msg: 'success',
    measurement: documentToUpdate,
  });
};

module.exports = updateMeasurement;
