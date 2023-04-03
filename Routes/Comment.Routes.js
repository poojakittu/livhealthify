const express = require("express");
const { CommentModel } = require("../Model/Comment.Model");

const CommentRoutes = express.Router();
const { authenticate } = require("../middleware/authentication.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const OtpModel = require("../Model/otp.model");
const logger = require("../middleware/Logger");
const { ProductModel } = require("../Model/Product.Model");
const { VendorModel } = require("../Model/vendor.model");

CommentRoutes.get("/allcomment", async (req, res) => {
  try {
    const product = await CommentModel.find();
    res.send({ data: product });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

CommentRoutes.get("/productcomment/:id", async (req, res) => {
  const Id = req.params.id;
  try {
    const product = await CommentModel.find({ productId: Id });
    res.send({ data: product, total: product.length });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

CommentRoutes.get("/vendorcomment/:id", async (req, res) => {
  const Id = req.params.id;
  try {
    const product = await CommentModel.find({ vendorId: Id });
    let sum = 0;
    for (let i = 0; i < product.length; i++) {
      sum += product[i].rating;
    }
    let x = sum / product.length;

    res.send({
      data: product,
      totalcomment: product.length,
      rating: x,
    });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

CommentRoutes.get("/:id", async (req, res) => {
  const Id = req.params.id;
  try {
    const product = await CommentModel.find({ productId: Id });

    logger.info("User Added comment", { userId: saved.userId, payload, date });
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

CommentRoutes.post("/add", authMiddleware, async (req, res) => {
  let payload = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const date = new Date();

  const data = await OtpModel.find({ _id: decoded.userId });
  const p = await ProductModel.find({ _id: payload.productId });
  try {
    let data1 = new CommentModel({
      comment: payload.comment,
      rating: payload.rating,
      username: data[0].name,
      image: payload.image,
      userId: decoded.userId,
      productId: payload.productId,
      vendorId: p[0].vendorId,
    });

    let saved = await data1.save();

    let x = await CommentModel.find({ vendorId: p[0].vendorId });
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
      sum += x[i].rating;
    }
    const avg = sum / x.length;
    const com = { rating: avg, comment: x.length };

    await VendorModel.findByIdAndUpdate({ _id: p[0].vendorId }, com);

    logger.info("User Added comment", { userId: saved.userId, payload, date });
    res.send({ msg: "Your Comment is Added" });
  } catch (err) {
    res.send(err);
  }
});

CommentRoutes.patch("/update/:id", authMiddleware, async (req, res) => {
  const user = req.body.userId;
  const Id = req.params.id;
  const payload = req.body;
  const date = new Date();
  const data = await CommentModel.findOne({ _id: Id });
  const data1 = data.userId;
  const a = JSON.stringify(data1);
  const b = JSON.stringify(user);
  try {
    if (a !== b) {
      res.send({ msg: "You are not authorized" });
    } else {
      await CommentModel.findByIdAndUpdate({ _id: Id }, payload);
      logger.info("User Updated data", { userId: Id, payload, date });
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

CommentRoutes.delete("/delete/:id", authenticate, async (req, res) => {
  const user = req.body.userId;
  const Id = req.params.id;
  const payload = req.body;

  const data = await CommentModel.findOne({ _id: Id });
  const data1 = data.userId;
  const a = JSON.stringify(data1);
  const b = JSON.stringify(user);
  try {
    if (a !== b) {
      res.send({ msg: "You are not authorized" });
    } else {
      await CommentModel.findByIdAndDelete({ _id: Id });
      res.send("Delete Your Comment");
      logger.info("User Delete comment", { userId: Id, payload, date });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = { CommentRoutes };
