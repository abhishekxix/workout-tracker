const mongoose = require('mongoose');
const Measurement = require('./Measurement');
const WorkoutSession = require('./WorkoutSession');

const DailyStatSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, 'please provide date.'],
    validate: {
      validator: function (v) {
        const isLeapYear = (year) =>
          (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

        if (!/([0-9]{2}-){2}[0-9]{4}/.test(v)) return false;

        const [date, month, year] = v
          .split('-')
          .map((value) => Number.parseInt(value));

        if (date < 1 || date > 31 || year < 1975 || month > 12 || month < 1)
          return false;

        if (month === 2) {
          if (isLeapYear(year)) {
            if (date > 29) return false;
          } else if (date > 28) return false;
        } else if ([4, 6, 9, 11].includes(month) && date === 31) return false;

        return true;
      },
      message: '{VALUE} is not a valid date.',
    },
    unique: true,
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

  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

DailyStatSchema.pre('deleteMany', async function () {
  const documentsToBeDeleted = await this.model.find(this.getFilter());
  const deletionPromises = [];

  documentsToBeDeleted.forEach(({ _id: dailyStatID }) => {
    deletionPromises.push(
      ...[
        Measurement.deleteMany({ dailyStatID }),
        WorkoutSession.deleteMany({ dailyStatID }),
      ],
    );
  });

  await Promise.all(deletionPromises);
});

DailyStatSchema.pre('deleteOne', async function () {
  const deletionPromises = [
    Measurement.deleteMany({ dailyStatID: this._conditions._id }),
    WorkoutSession.deleteMany({ dailyStatID: this._conditions._id }),
  ];

  await Promise.all(deletionPromises);
});

const DailyStat = mongoose.model('DailyStat', DailyStatSchema);

module.exports = DailyStat;
