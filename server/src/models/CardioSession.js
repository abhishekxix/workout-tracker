const { default: mongoose } = require('mongoose');
const OptionalAttribute = require('./OptionalAttribute');

const CardioSessionSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  name: {
    type: String,
    minlength: 1,
    maxlength: 50,
    match: /^[a-zA-Z0-9\s]+$/,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return Number.isInteger(v) && v > 0;
      },
      message: '{VALUE} is not an integer value',
    },
  },

  workoutSessionID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'WorkoutSession',
  },
});

CardioSessionSchema.pre('deleteMany', async function () {
  const documentsToBeDeleted = await this.model.find(this.getFilter());
  const deletionPromises = [];

  documentsToBeDeleted.forEach(({ _id: cardioSessionID }) => {
    deletionPromises.push(OptionalAttribute.deleteMany({ cardioSessionID }));
  });

  await Promise.all(deletionPromises);
});

CardioSessionSchema.pre('deleteOne', async function () {
  const deletionPromises = [
    OptionalAttribute.deleteMany({ cardioSessionID: this._conditions._id }),
  ];

  await Promise.all(deletionPromises);
});

module.exports = mongoose.model('CardioSession', CardioSessionSchema);
