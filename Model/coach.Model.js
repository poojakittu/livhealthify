const mongoose = require("mongoose");
require("dotenv").config();

const CoachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: {type: Number},
  password2:{ type: String, required: true },
  gender:{ type: String, required: true },
  img: { type: String },
});

const CoachModel = mongoose.model("Coach", CoachSchema);

module.exports = { CoachModel };