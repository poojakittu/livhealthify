const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  purpose : [{
    type: String,
    required: true,
  }],
  referralcode:{
    type: String,
    default:"xyz"
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  language: [{
    type: String,
    required: true,
  }],
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  physicallyactive: {
    type: String,
    required: true,
  },
  height: [{
    type: Number,
    required: true,
  }],
  currentweight: [{
    type: Number,
    required: true,
  }],
  targetweight: [{
    type: String,
    required: true,
  }],
  medicalcondition: [{
    type: String,
    required: true,
  }],
  calories:{ type: String,},
  img:{ type: String,},
  bio:{ type: String},
  foodprefrence:{ type: String  },
  phoneNumber: { type: String,unique : true,  },
  email: { type: String,unique : true, },
  name: { type: String,  },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const OtpModel = mongoose.model('Otp', OtpSchema);

module.exports = OtpModel;
