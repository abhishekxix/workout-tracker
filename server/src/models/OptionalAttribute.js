const { default: mongoose } = require('mongoose');

const OptionalAttributeSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  cardioSessionID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'CardioSession',
  },

  key: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
  },

  value: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
  },
});

module.exports = mongoose.model('OptionalAttribute', OptionalAttributeSchema);
