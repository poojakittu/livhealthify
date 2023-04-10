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
  const payload = req.body;
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
        userId: req.body.userId,
      });

      const savedId = await cart.save();
      const workout = await WorkourModel.findById({ _id: savedId._id });
      const cal = workout.burn;

      for (let i = 0; i < payload.type.length; i++) {
        const new_val = cal + payload.type[i].calories;
        const newburn = { burn: new_val };
        workout.type.push({
          name: payload.type[i].name,
          motion: payload.type[i].motion,
          speed: payload.type[i].speed,
          time: payload.type[i].time,
          distance: payload.type[i].distance,
          calories: payload.type[i].calories,
          reps: payload.type[i].reps,
          level: payload.type[i].level,
        });

        await workout.save();
        await WorkourModel.findByIdAndUpdate({ _id: savedId._id }, newburn);
      }
      // await WorkourModel.findByIdAndUpdate({ _id: savedId._id }, ddd);
      return res.status(202).send({ msg: "Your item is Added" });
    } else {
      const workout = await WorkourModel.findById({ _id: data[0]._id });
      console.log(workout);
      const cal = workout.burn;

      for (let i = 0; i < payload.type.length; i++) {
        const new_val = cal + payload.type[i].calories;
        const newburn = { burn: new_val };
        workout.type.push({
          name: payload.type[i].name,
          motion: payload.type[i].motion,
          speed: payload.type[i].speed,
          time: payload.type[i].time,
          distance: payload.type[i].distance,
          calories: payload.type[i].calories,
          reps: payload.type[i].reps,
          level: payload.type[i].level,
        });

        await workout.save();
        await WorkourModel.findByIdAndUpdate({ _id: data[0]._id }, newburn);
      }
      // await WorkourModel.findByIdAndUpdate({ _id: savedId._id }, ddd);
      return res.status(201).send({ msg: "Your item is update" });
    }
  } catch (err) {
    res.send(err);
  }
});

workoutRoutes.patch("/update/:id", authMiddleware, async (req, res) => {
  const Id = req.params.id;
  const que = req.query.q;
  const payload = req.body;

  try {
    if (Id) {
      await WorkourModel.findByIdAndUpdate(
        { _id: Id },
        { Target: req.body.Target }
      );
    }
    if (Id && que) {
      const data = await WorkourModel.findById({ _id: Id });
      data.type.forEach((el) => {
        if (el._id.toString() == que) {
          (el.name = payload.type[0].name),
            (el.motion = payload.type[0].motion),
            (el.speed = payload.type[0].speed),
            (el.time = payload.type[0].time),
            (el.distance = payload.type[0].distance),
            (el.calories = payload.type[0].calories),
            (el.reps = payload.type[0].reps),
            (el.level = payload.type[0].level);
        }
      });
      await data.save();
    }

    res.send({ msg: "updated Sucessfully" });
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = {
  workoutRoutes,
};
