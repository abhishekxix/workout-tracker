const mongoose = require('mongoose');

const DailyStatSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, 'please provide date.'],
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

const DailyStat = mongoose.model('DailyStat', DailyStatSchema);

module.exports = DailyStat;
