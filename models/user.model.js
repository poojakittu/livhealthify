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
 
},
referralcode:{
  type: String,
  
},
city: {
  type: String,
  
},
pincode: {
  type: String,
 
},
language: [],
gender: {
  type: String,
 
},
age: {
  type: String,
  
},
physicallyactive: {
  type: String,
 
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
