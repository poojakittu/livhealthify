const express = require("express");
const { CommentModel } = require("../Model/Comment.Model");

const { authenticate } = require("../middleware/authentication.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const OtpModel = require("../Model/otp.model");
const { ProductModel } = require("../Model/Product.Model");
const TotalRoutes = express.Router();

TotalRoutes.get("/", async (req, res) => {
  try {
    const product = await ProductModel.find();
    res.send({ data: product, total: product.length });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

module.exports = { TotalRoutes };
