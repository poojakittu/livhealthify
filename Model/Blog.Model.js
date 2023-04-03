const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String },
    image: { type: String },
    date:{ type: Number },
    month:{ type: String },
    description: { type: String },
    category: [{ type: String }],
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = {
    BlogModel
};
