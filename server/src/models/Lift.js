const { default: mongoose } = require('mongoose');
const Set = require('./Set');

const LiftSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },

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

LiftSchema.pre('deleteMany', async function () {
  const documentsToBeDeleted = await this.model.find(this.getFilter());
  const deletionPromises = [];

  documentsToBeDeleted.forEach(({ _id: liftID }) => {
    deletionPromises.push(Set.deleteMany({ liftID }));
  });

  await Promise.all(deletionPromises);
});

LiftSchema.pre('deleteOne', async function () {
  const deletionPromises = [Set.deleteMany({ liftID: this._conditions._id })];

  await Promise.all(deletionPromises);
});

module.exports = mongoose.model('Lift', LiftSchema);
