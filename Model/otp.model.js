const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  requirement: [{ type: String,required: true }],
  city: { type: String,required: true },
  state: { type: String,required: true },
  sex: { type: String, required: true },
  age: { type: Number, required: true},
  activity: { type: String,required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  medicalcondition:[{ type: String,required: true }],
  phoneNumber: { type: String, unique: true },
  email: { type: String },
  name: { type: String,required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const OtpModel = mongoose.model("Otp", OtpSchema);

module.exports = OtpModel;
