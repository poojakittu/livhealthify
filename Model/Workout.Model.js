const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const caloriesModel = mongoose.model("Workout", WorkoutSchema);

module.exports = {
  caloriesModel,
};
