const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
  {
    Target: { type: Number, default: 0 },
    //20.8%(targetNutrition)
    date: { type: String, default: "000" },
    burn: { type: Number, default: 0 },
    //cal
    type: [
      {
        name: { type: String },
        motion: { type: String },
        speed: { type: Number },
        time: { type: Number },
        distance: { type: Number },
        calories: { type: Number },
        reps: { type: String },
        level: { type: String },
      },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const WorkourModel = mongoose.model("Workout", WorkoutSchema);

module.exports = {
  WorkourModel,
};
