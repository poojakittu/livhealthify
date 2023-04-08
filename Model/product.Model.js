const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    price: { type: Number },
    packedPrice:{ type: Number },
    rating: { type: Number },
    info: { type: String },
    brand: { type: String },
    description: { type: String },
    image: [{ type: String }],
    review: { type: String },
    cod: { type: String },
    shipping: { type: String }
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const ProductModel = mongoose.model("products", productSchema);

module.exports = {
  ProductModel,
};
