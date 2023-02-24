const mongoose = require('mongoose');

module.exports.connectDB = async (uri) => {
  await mongoose.connect(uri);
};
