const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
