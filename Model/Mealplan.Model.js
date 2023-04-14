const mongoose = require("mongoose");
const MealSchema = new mongoose.Schema({
  mealType: { type: String },
  plan: [
    {
      day: { type: String },
      breakFast: [
        {
          foodItem: { type: String },
          quantity: { type: String },
          calories: { type: String },
        },
      ],
      lunch: [
        {
          foodItem: { type: String },
          quantity: { type: String },
          calories: { type: String },
        },
      ],
      dinner: [
        {
          foodItem: { type: String },
          quantity: { type: String },
          calories: { type: String },
        },
      ],
      
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
});

// Define a mongoose model for the data
const MealModel = mongoose.model("Meal", MealSchema);

module.exports = {
  MealModel
};
