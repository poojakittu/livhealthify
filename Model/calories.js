const mongoose = require("mongoose");

const caloriesSchema = new mongoose.Schema(
  {
    Targetcalories: { type: Number, required: true },
    date:{type:String,default:"000"},
    Consumedcalories: { type: Number, required: true, default: 0 },
    breakfast: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        istrue: { type: String, default: false },
        calories: { type: Number, required: true },
      },
    ],
    lunch: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        istrue: { type: String, default: false },
        calories: { type: Number, required: true },
      },
    ],
    eveningsnacks: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        istrue: { type: String, default: false },
        calories: { type: Number, required: true },
      },
    ],
    dinner: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        istrue: { type: String, default: false },
        calories: { type: Number, required: true },
      },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const caloriesModel = mongoose.model("calories", caloriesSchema);

module.exports = {
  caloriesModel,
};
