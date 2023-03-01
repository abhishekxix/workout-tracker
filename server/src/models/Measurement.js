const { default: mongoose } = require('mongoose');

const MeasurementSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  dailyStatID: {
    type: mongoose.Types.ObjectId,
    ref: 'DailyStat',
    required: true,
  },

  bodyPart: {
    type: String,
    required: [true, 'please mention the body part to store its measurement'],
    enum: [
      'neck',
      'chest',
      'shoulders',
      'shoulder width',
      'left arm',
      'right arm',
      'left forearm',
      'right forearm',
      'waist',
      'butt',
      'left thigh',
      'right thigh',
      'left calf',
      'right calf',
    ],
  },

  measurement: {
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

MeasurementSchema.index({ dailyStatID: 1, bodyPart: 1 }, { unique: true });

module.exports = mongoose.model('Measurement', MeasurementSchema);
