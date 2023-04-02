const mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "774bgtumnhnhydscffsr";
const userSchema = new mongoose.Schema(
  {  
purpose : [{
  type: String,
  required: true,
}],
number: {
  type: String,
  required: true,
},
name: {
  type: String,
  required: true,
},
referralcode:{
  type: String
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
password: {
  type: String,
  minLength: 8,
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
weighttoloose: [],
medicalcondition: [{
  type: String,
  required: true,
}],

  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      number: this.number,
    },
    JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  return token;
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
