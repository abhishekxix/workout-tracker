const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../../errors');
const { Measurement } = require('../../models');

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
  if (dailyStatID) documentToUpdate.dailyStatID = dailyStatID;
  if (measurement) documentToUpdate.measurement = measurement;

  await documentToUpdate.save();

  res.status(StatusCodes.OK).json({
    msg: 'success',
    measurement: documentToUpdate,
  });
};

module.exports = updateMeasurement;
