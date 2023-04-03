const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { CartModel } = require("../Model/Cart.Model");
const CartRoutes = express.Router();
const jwt = require("jsonwebtoken");

CartRoutes.get("/allproductdata", async (req, res) => {
  const order = req.query.order || "asc";
  try {
    if (req.query.category) {
      const products = await CartModel.find({
        category: { $regex: req.query.category, $options: "i" },
      });
      res.send({ data: products, total: products.length });
    } else if (req.query.color) {
      const color = await CartModel.find({
        colour: { $regex: req.query.color, $options: "i" },
      });
      res.send({ data: color, total: color.length });
    } else if (req.query.max && req.query.min) {
      const data = await CartModel.find({
        price: { $gt: req.query.max, $lt: req.query.min },
      });
      res.send({ data: data, total: data.length });
    } else {
      const product = await CartModel.find();
      res.send({ data: product, total: product.length });
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

CartRoutes.get("/", authMiddleware, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.body.userId = decoded.userId;
  console.log(token);
  try {
    const product = await CartModel.find({ userId: decoded.userId });
    res.send({ data: product, Total: product.length });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

CartRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await CartModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

CartRoutes.post("/add", authMiddleware, async (req, res) => {
  let payload = req.body;
  // console.log(payload)
  try {
    let cartItem = await CartModel.findOne({ productId:payload.productId });
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
      res.send({ msg: "Your item is Inc" });
    } else {
      let data1 = new CartModel(payload);
      // console.log(data1);
      let saved = await data1.save();
      res.send({ msg: "Your item is Added" });
    }
  } catch (err) {
    res.send(err);
  }
});

CartRoutes.patch("/update/:id", authMiddleware, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const data = await CartModel.findOne({ _id: Id });
  const d = JSON.stringify(data.userId);
  const e = JSON.stringify(decoded.userId);
  try {
    if (d !== e) {
      res.send({ msg: "You are not authorized" });
    } else {
      await CartModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

CartRoutes.delete("/delete/:id", authMiddleware, async (req, res) => {
  const Id = req.params.id;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const data = await CartModel.findOne({ _id: Id });
  const d = JSON.stringify(data.userId);
  const e = JSON.stringify(decoded.userId);
  console.log(d);
  console.log(e);
  try {
    if (d !== e) {
      res.send({ msg: "You are not authorized" });
    } else {
      await CartModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted your item");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  CartRoutes,
};
