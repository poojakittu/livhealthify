const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  purpose: [{ type: String,required: true }],
  referralcode:{ type: String,required: true,default:"00000" },
  city: { type: String,required: true },
  pincode:{ type: Number,required: true },
  language:{ type: String,required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true},
  physicallyactive: { type: String,required: true },
  medicalcondition:[{ type: String,required: true }],
  height: { type: String, required: true },
  currentweight: { type: Number, required: true },
  targetweight:{ type: Number, required: true },
  phoneNumber: { type: Number, unique: true },
  email: { type: String },
  name: { type: String,required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const OtpModel = mongoose.model("Otp", OtpSchema);

module.exports = OtpModel;




