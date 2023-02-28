const { default: mongoose } = require('mongoose');

const SetSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  liftID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Lift',
  },

  weight: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return Number.isInteger(v) && v > 0;
      },
      message: '{VALUE} is not an integer value',
    },
  },

  reps: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return Number.isInteger(v) && v > 0;
      },
      message: '{VALUE} is not an integer value',
    },
  },
});

module.exports = mongoose.model('Set', SetSchema);
