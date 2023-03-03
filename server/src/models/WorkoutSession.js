const { default: mongoose } = require('mongoose');
const moment = require('moment');
const Lift = require('./Lift');
const CardioSession = require('./CardioSession');

const WorkoutSessionSchema = new mongoose.Schema({
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

  dailyStatID: {
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

WorkoutSessionSchema.index(
  { startTime: 1, endTime: 1, dailyStatID: 1 },
  { unique: true },
);

WorkoutSessionSchema.pre('deleteMany', async function () {
  const documentsToBeDeleted = await this.model.find(this.getFilter());
  const deletionPromises = [];

  documentsToBeDeleted.forEach(({ _id: workoutSessionID }) => {
    deletionPromises.push(
      ...[
        Lift.deleteMany({ workoutSessionID }),
        CardioSession.deleteMany({ workoutSessionID }),
      ],
    );
  });

  await Promise.all(deletionPromises);
});

WorkoutSessionSchema.pre('deleteOne', async function () {
  const deletionPromises = [
    Lift.deleteMany({ workoutSessionID: this._conditions._id }),
    CardioSession.deleteMany({ workoutSessionID: this._conditions._id }),
  ];

  await Promise.all(deletionPromises);
});

module.exports = mongoose.model('WorkoutSession', WorkoutSessionSchema);
