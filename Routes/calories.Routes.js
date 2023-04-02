const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const caloriesRoutes = express.Router();
const jwt = require("jsonwebtoken");
const { caloriesModel } = require("../models/calories");



caloriesRoutes.post("/add", async (req, res) => {
  let payload = req.body;
  // console.log(payload)
  try {
      let data1 = new caloriesModel(payload);
      // console.log(data1);
      let saved = await data1.save();
      res.send({ msg: "Your item is Added" });
  } catch (err) {
    res.send(err);
  }
});

// caloriesRoutes.patch("/update/:id", authMiddleware, async (req, res) => {
//   const Id = req.params.id;
//   const payload = req.body;
//   const token = req.headers.authorization;
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   const data = await CartModel.findOne({ _id: Id });
//   const d = JSON.stringify(data.userId);
//   const e = JSON.stringify(decoded.userId);
//   try {
//     if (d !== e) {
//       res.send({ msg: "You are not authorized" });
//     } else {
//       await CartModel.findByIdAndUpdate({ _id: Id }, payload);
//       res.send({ msg: "updated Sucessfully" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ err: "Something went wrong" });
//   }
// });

// caloriesRoutes.delete("/delete/:id", authMiddleware, async (req, res) => {
//   const Id = req.params.id;
//   const token = req.headers.authorization;
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   const data = await CartModel.findOne({ _id: Id });
//   const d = JSON.stringify(data.userId);
//   const e = JSON.stringify(decoded.userId);
//   console.log(d);
//   console.log(e);
//   try {
//     if (d !== e) {
//       res.send({ msg: "You are not authorized" });
//     } else {
//       await CartModel.findByIdAndDelete({ _id: Id });
//       res.send("Deleted your item");
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ msg: "Something went wrong" });
//   }
// });

module.exports = {
  caloriesRoutes,
};
