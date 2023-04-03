const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  phoneNumber: { type: String,unique : true,  },
  email: { type: String,unique : true, },
  name: { type: String,  },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const OtpModel = mongoose.model('Otp', OtpSchema);

module.exports = OtpModel;
