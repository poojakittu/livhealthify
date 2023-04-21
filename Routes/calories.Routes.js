const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const caloriesRoutes = express.Router();
const jwt = require("jsonwebtoken");
const { caloriesModel } = require("../Model/calories");


caloriesRoutes.get("/allcalories", async (req, res) => {
  try {
    const product = await caloriesModel.find();
    console.log(product);
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

caloriesRoutes.get("/todaycalories", authMiddleware, async (req, res) => {
  const x = req.query.q;

  try {
    const product = await caloriesModel.find({
      date: x,
      userId: req.body.userId,
    });
    res.send({ data: product, total: product.length });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

caloriesRoutes.post("/add", authMiddleware, async (req, res) => {
  let x = new Date();
  let y = JSON.stringify(x);
  let bag = "";
  for (let i = 1; i <= 10; i++) {
    bag += y[i];
  }
  let payload = req.body;

  const date = { date: bag, userId: req.body.userId };
  const data = await caloriesModel.find({ userId: req.body.userId, date: bag });
  try {
    if (data.length === 0) {
      const data1 = new caloriesModel(payload);
      const saved = await data1.save();
      const fg = { date: bag };
      await caloriesModel.findByIdAndUpdate({ _id: saved._id }, fg);
      res.send({ msg: "Your item is Added" });
    } else {
      const data1 = await caloriesModel.findOneAndUpdate({
        userId: req.body.userId,
        date: bag,
      });
      if (payload.breakfast) {
        for (let i = 0; i < payload.breakfast.length; i++) {
          data1.breakfast.push({
            name: payload.breakfast[i].name,
            quantity: payload.breakfast[i].quantity,
            calories: payload.breakfast[i].calories,
          });
          await data1.save();
        }
      }
      if (payload.lunch) {
        for (let i = 0; i < payload.lunch.length; i++) {
          data1.lunch.push({
            name: payload.lunch[i].name,
            quantity: payload.lunch[i].quantity,
            calories: payload.lunch[i].calories,
          });
          await data1.save();
        }
      }

      if (payload.eveningsnacks) {
        for (let i = 0; i < payload.eveningsnacks.length; i++) {
          data1.eveningsnacks.push({
            name: payload.eveningsnacks[i].name,
            quantity: payload.eveningsnacks[i].quantity,
            calories: payload.eveningsnacks[i].calories,
          });
          await data1.save();
        }
      }

      if (payload.dinner) {
        for (let i = 0; i < payload.dinner.length; i++) {
          data1.dinner.push({
            name: payload.dinner[i].name,
            quantity: payload.dinner[i].quantity,
            calories: payload.dinner[i].calories,
          });
          await data1.save();
        }
      }
      if(payload.Targetcalories){
        const bb={Targetcalories:req.body.Targetcalories}
       const xh= await caloriesModel.findByIdAndUpdate({_id:data1._id},bb)
        
      }
      res.send({ msg: "Your item is updated" });
    }
  } catch (err) {
    res.send(err);
  }
});

caloriesRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const val = req.query.q;
  const foodid = req.query.foodid;

  try {
    const data = await caloriesModel.findById(Id);
    if (val == "breakfast") {
      let sum = 0;
      let total = 0;
      data.breakfast.forEach((item) => {
        const x = JSON.stringify(item._id);
        const y = JSON.stringify(foodid);
        if (x == y) {
          item.istrue = "true";
        }
        if (item.istrue == "true") {
          sum += item.calories;
        }
        total += item.calories;
      });
      await data.save();
      res.send({ data: data.breakfast, consumption: sum, total: total });
    } else if (val == "lunch") {
      let sum = 0;
      let total = 0;
      data.lunch.forEach((item) => {
        const x = JSON.stringify(item._id);
        const y = JSON.stringify(foodid);
        if (x == y) {
          item.istrue = "true";
        }
        if (item.istrue == "true") {
          sum += item.calories;
        }
        total += item.calories;
      });
      await data.save();
      res.send({ data: data.lunch, consumption: sum, total: total });
    } else if (val == "eveningsnacks") {
      let sum = 0;
      let total = 0;
      data.eveningsnacks.forEach((item) => {
        const x = JSON.stringify(item._id);
        const y = JSON.stringify(foodid);
        if (x == y) {
          item.istrue = "true";
        }
        if (item.istrue == "true") {
          sum += item.calories;
        }
        total += item.calories;
      });
      await data.save();
      res.send({ data: data.eveningsnacks, consumption: sum, total: total });
    } else if (val == "dinner") {
      let sum = 0;
      let total = 0;
      data.dinner.forEach((item) => {
        const x = JSON.stringify(item._id);
        const y = JSON.stringify(foodid);
        if (x == y) {
          item.istrue = "true";
        }
        if (item.istrue == "true") {
          sum += item.calories;
        }
        total += item.calories;
      });
      await data.save();
      res.send({ data: data.dinner, consumption: sum, total: total });
    }
    let value = 0;
    let total_calories = 0;
    data.breakfast.forEach((el) => {
      if (el.istrue == "true") {
        value += el.calories;
      } else {
        total_calories += el.calories;
      }
    });
    data.lunch.forEach((el) => {
      if (el.istrue == "true") {
        value += el.calories;
      } else {
        total_calories += el.calories;
      }
    });
    data.eveningsnacks.forEach((el) => {
      if (el.istrue == "true") {
        value += el.calories;
      } else {
        total_calories += el.calories;
      }
    });
    data.dinner.forEach((el) => {
      if (el.istrue == "true") {
        value += el.calories;
      } else {
        total_calories += el.calories;
      }
    });

    const updateValue = {
      Targetcalories: total_calories + value,
      Consumedcalories: value,
    };
    await caloriesModel.findByIdAndUpdate({ _id: Id }, updateValue);
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

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
