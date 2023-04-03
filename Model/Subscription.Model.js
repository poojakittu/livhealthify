const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
  { 
    title: { type: String },
    info: [{ type: String }],
    price: { type: String },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
      },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const SubscriptionModel = mongoose.model("SubscriptionData", SubscriptionSchema);

module.exports = {
    SubscriptionModel
};
