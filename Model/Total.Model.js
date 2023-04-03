const mongoose = require("mongoose");

const TotalcommentSchema = new mongoose.Schema(
  {
    username: { type: String },
    img:{ type: String },
    rating: { type: Number },
    review: { type: Number },
    info:{ type: String },
    productid:[{ type: String }],
    commentId:[{ type: String }],
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

const Totalcommentmodel = mongoose.model("TotalComment", TotalcommentSchema);

module.exports = {
    Totalcommentmodel
};
