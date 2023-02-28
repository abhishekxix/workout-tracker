const { default: mongoose } = require('mongoose');

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

module.exports = mongoose.model('CardioSession', CardioSessionSchema);
