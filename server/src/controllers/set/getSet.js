const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../../errors');
const { Set } = require('../../models');

const getSet = async (req, res) => {
  const { setID } = req.params;
  const {
    user: { userID },
  } = res.locals;

  const set = await Set.findOne({ _id: setID, userID }, { __v: 0 });

  if (!set) throw new NotFoundError(`no set found with ID: ${setID}`);

  res.status(StatusCodes.OK).json({
    msg: 'success',
    set,
  });
};

module.exports = getSet;
