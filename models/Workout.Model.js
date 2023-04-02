const { mongoose } = require("mongoose");

const ExersizeSchema = mongoose.Schema(
  {
    name: { type: String},
    image_url: [{ type: String}],
    desc:{ type: String},
    position:{ type: String},
    type:[
      {
        exersize:{ type: String},
        level:{ type: String},
        set:{ type: Number},
        repetition:{ type: Number},
        video:{ type: String}
      }
    ]
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
  );
  
  const WorkOutModel = mongoose.model("Exersize", ExersizeSchema);

  module.exports = {
    WorkOutModel
  };

  // const mongoose = require('mongoose');

// const OtpSchema = new mongoose.Schema({
//   purpose : [{
//     type: String,
//     required: true,
//   }],
//   number: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   referralcode:{
//     type: String
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   pincode: {
//     type: String,
//     required: true,
//   },
//   language: [{
//     type: String,
//     required: true,
//   }],
//   gender: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: String,
//     required: true,
//   },
//   physicallyactive: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     minLength: 8,
//   },
//   height: [{
//     type: Number,
//     required: true,
//   }],
//   currentweight: [{
//     type: Number,
//     required: true,
//   }],
//   targetweight: [{
//     type: String,
//     required: true,
//   }],
//   medicalcondition: [{
//     type: String,
//     required: true,
//   }],
//   otp: { type: String, required: true },
//   expiresAt: { type: Date, required: true },
// });

// const OtpModel = mongoose.model('Otp', OtpSchema);

// module.exports = OtpModel;
