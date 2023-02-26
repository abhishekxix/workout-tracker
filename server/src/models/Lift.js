const { default: mongoose } = require('mongoose');

const LiftSchema = new mongoose.Schema({
  workoutSessionID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'WorkoutSession',
  },

  name: {
    type: String,
    minlength: 1,
    maxlength: 50,
    match: /^[a-zA-Z0-9\s]+$/,
    required: true,
  },

  type: {
    type: String,
    required: [true, 'please mention the type of weights used.'],
    enum: [
      'bodyweight',
      'dumbbell',
      'barbell',
      'kettlebell',
      'cable',
      'band',
      'other',
    ],
  },
});

module.exports = mongoose.model('Lift', LiftSchema);
