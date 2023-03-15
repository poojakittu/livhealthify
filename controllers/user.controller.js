const bcrypt = require("bcryptjs");
const userModel = require("../Model/user.model");
const dotenv = require("dotenv");
let jwt = require("jsonwebtoken");
const JWT_SECRET = "774bgtumnhnhydscffsr";

require("dotenv").config();

const signup = async (req, res) => {
  const user = req.body;
  let {  purpose,
    number,
    name,
    referralcode,
    city,
    pincode,
    language,
    gender,
    age,
    physicallyactive,
    password,
    height,
    currentweight,
    targetweight,
    weighttoloose,
    medicalcondition } = user;

  let existingUser = await userModel.findOne({
    name,
  });

  if (existingUser) {
    return res.status(400).send({
      status: "error",
      message: "User already exists",
    });
  } else {
    password = bcrypt.hashSync(password);
    let user = await userModel.create({
      purpose,
number,
name,
referralcode,
city,
pincode,
language,
gender,
age,
physicallyactive,
password,
height,
currentweight,
targetweight,
weighttoloose,
medicalcondition,
    });
    user = user.toJSON();
    delete user.password;

    return res.send({
      status: "Success",
      data: user,
    });
  }
};

const login = async (req, res) => {
  const user = req.body;

  let {  purpose,
    number,
    name,
    referralcode,
    city,
    pincode,
    language,
    gender,
    age,
    physicallyactive,
    password,
    height,
    currentweight,
    targetweight,
    weighttoloose,
    medicalcondition, } = user;

  let existingUser = await userModel.findOne({  purpose,
    number,
    name,
    referralcode,
    city,
    pincode,
    language,
    gender,
    age,
    physicallyactive,
    password,
    height,
    currentweight,
    targetweight,
    weighttoloose,
    medicalcondition, });

  if (existingUser) {
    let match = bcrypt.compareSync(password, existingUser.password);

    if (match) {
      let token = jwt.sign(
        {
          _id: existingUser._id,
          name: existingUser.name,
          
        },
        JWT_SECRET
      );

      // Verifying...
      let result = jwt.verify(token, JWT_SECRET);
      // Decoding...
      result = jwt.decode(token);

      return res.send({
        status: "success",
        data: { token },
      });
    } else {
      return res.status(400).send({
        status: "error",
        message: "incorrect password !",
      });
    }
  } else {
    return res.status(400).send({
      status: "error",
      message: "user does not exist",
    });
  }
};

const userLoggedIn = async (req, res) => {
  try {
    let token = req.headers.authorization || "";

    token = token.split(" ")[1];

    if (token) {
      const result = jwt.verify(token, JWT_SECRET);
      let user = await userModel.findById(result._id);

      user = user.toJSON();
      delete user.password;

      return res.send({
        status: "success",
        data: user,
      });
    } else {
      return res.status(400).send({
        status: "error",
        message: "user not logged in",
      });
    }
  } catch (err) {
    return res.status(400).send({
      status: "error",
      message: "something went wrong",
    });
  }
};

module.exports = {
  userLoggedIn,
  login,
  signup,
};
