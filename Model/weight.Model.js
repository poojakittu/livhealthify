const mongoose = require("mongoose");

const weightSchema = mongoose.Schema({
  weight: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId,  required: true },
  date: { type: String },
  currentdate: { type: String },
},
{
    versionKey: false,
    timestamps: true,
  });

const weightModel = mongoose.model("weight", weightSchema);

module.exports = { weightModel };
