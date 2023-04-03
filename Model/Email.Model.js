const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema(
  { 
    Email: { type: String },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const EmailModel = mongoose.model("Email", EmailSchema);

module.exports = {
    EmailModel
};
