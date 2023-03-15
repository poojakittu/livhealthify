const mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "774bgtumnhnhydscffsr";
const userSchema = new mongoose.Schema(
  {
    
purpose : [],
number: {
  type: String,
  required: true,
},
name: {
  type: String,
  required: true,
},
referralcode:{
  type: String,
  required: true,
},
city: {
  type: String,
  required: true,
},
pincode: {
  type: String,
  required: true,
},
language: [],
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
height: [],
currentweight: [],
targetweight: [],
weighttoloose: [],
medicalcondition: [],

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
