const { default: mongoose } = require('mongoose');
const moment = require('moment');

const WorkoutSessionSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 50,
    match: /^[a-zA-Z0-9\s]+$/,
  },

  dailyStatsID: {
    type: mongoose.Types.ObjectId,
    ref: 'DailyStat',
    required: true,
  },

  startTime: {
    type: String,
    match: /^([01][0-9]|2[0-3]):[0-5][0-9]$/,
    required: true,
  },

  endTime: {
    type: String,
    match: /^([01][0-9]|2[0-3]):[0-5][0-9]$/,
    required: true,
    validate: {
      validator: function (endTime) {
        const startTime = this.startTime;
        if (startTime && endTime) {
          const startMoment = moment(startTime, 'HH:mm');
          const endMoment = moment(endTime, 'HH:mm');
          return endMoment.isAfter(startMoment);
        }
        return false;
      },
      message: 'end time should be greater than start time',
    },
  },
});

module.exports = mongoose.model('WorkoutSession', WorkoutSessionSchema);
