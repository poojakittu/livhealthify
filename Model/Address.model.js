const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    name: { type: String },
    Mobile: { type: Number },
    pincode: { type: Number },
    locality: { type: String },
    address: { type: String },
    city: { type: String },
    state: [{ type: String }],
    landmark: { type: String },
    alternatephone: { type: Number },
    addresstype:[{ type: String }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const AddressModel = mongoose.model("Address", AddressSchema);

module.exports = {
  AddressModel,
};
