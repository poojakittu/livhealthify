const mongoose = require("mongoose");
require("dotenv").config();

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  img:{ type: String},
  password: { type: String, required: true },
  address:{ type: String, required: true },
  city:{ type: String, required: true },
  pincode:{ type: String, required: true },
  phone:{ type: Number, required: true },
  state:{ type: String, required: true },
  userType: { type: String, required: true, default: "admin" }
});

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = { AdminModel };