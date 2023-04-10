const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const workoutRoutes = express.Router();
const jwt = require("jsonwebtoken");
const { WorkourModel } = require("../Model/Workout.Model");

workoutRoutes.get("/", authMiddleware, async (req, res) => {
  const userId = req.body.userId;
  let x = new Date();
  let y = JSON.stringify(x);
  let bag = "";
  for (let i = 1; i <= 10; i++) {
    bag += y[i];
  }
  try {
    const data = await WorkourModel.find({ userId: userId, date: bag });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

workoutRoutes.post("/add", authMiddleware, async (req, res) => {
  let x = new Date();
  let y = JSON.stringify(x);
  let bag = "";
  for (let i = 1; i <= 10; i++) {
    bag += y[i];
  }
  const data = await WorkourModel.find({ userId: req.body.userId, date: bag });

  try {
    if (data.length == 0) {
      const cart = await WorkourModel.create({
        Target: req.body.Target,
        //20.8%(targetNutrition)
        date: bag,
        //cal
        userId: req.body.userId,
      });
      const savedId = await cart.save();
      const workout = await WorkourModel.findById({ _id: savedId._id });
      const cal=workout.burn
      const ddd={burn:cal+req.body.calories}

      workout.type.push({
        name: req.body.name,
        motion: req.body.motion,
        speed: req.body.speed,
        time: req.body.time,
        distance: req.body.distance,
        calories: req.body.calories,
        reps: req.body.reps,
        level: req.body.level,
      });
      await workout.save();
      await WorkourModel.findByIdAndUpdate({_id:savedId._id},ddd)
      return res.status(201).send({ msg: "Your item is Added" });
    } else {
      const workout = await WorkourModel.findById({ _id: data[0].id });
      const cal=workout.burn
      const ddd={burn:cal+req.body.calories}
    
      workout.type.push({
        name: req.body.name,
        motion: req.body.motion,
        speed: req.body.speed,
        time: req.body.time,
        distance: req.body.distance,
        calories: req.body.calories,
        reps: req.body.reps,
        level: req.body.level,
      });
      await workout.save();
      await WorkourModel.findByIdAndUpdate({_id:data[0]._id},ddd)
      return res.status(201).send({ msg: "Your item is updated" });
    }
  } catch (err) {
    res.send(err);
  }
});

// workoutRoutes.patch("/update/:id",authMiddleware, async (req, res) => {
//   const Id = req.params.id;
//   const payload = req.body;

//   const hotel = await ProductModel.findOne({ _id: Id });

//   const hotelId = hotel.created_by;
//   console.log(hotelId);
//   const vendorId_making_req = req.body.created_by;
//   try {
//     if (req.body. !== hotelId) {
//       res.send({ msg: "You are not authorized" });
//     } else {
//       await ProductModel.findByIdAndUpdate({ _id: Id }, payload);
//       res.send({ msg: "updated Sucessfully" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ err: "Something went wrong" });
//   }
// });

module.exports = {
  workoutRoutes,
};
