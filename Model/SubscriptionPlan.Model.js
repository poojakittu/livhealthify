const mongoose = require("mongoose");
const SubscriptionPlan  = new mongoose.Schema({
  type: { type: String },
  duration: { type: String},
  startDate: { type: String },
  endDate: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId,  required: true },
});

// Define a mongoose model for the data
const SubscriptionPlanModel = mongoose.model("SubscriptionPlan", SubscriptionPlan);

module.exports = {
    SubscriptionPlanModel
};
