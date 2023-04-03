const express = require("express");
const { WorkOutModel } = require("../models/Workout.Model");
const WorkOutRoutes = express.Router();




WorkOutRoutes.get("/", async (req, res) => {
  const payload = req.body;
  try {
    const product = await WorkOutModel.find();
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

WorkOutRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await WorkOutModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

WorkOutRoutes.post("/add", async (req, res) => {
  const payload = req.body;

  try {
    const title = await WorkOutModel.findOne({ name: payload.name });
    if (title) {
      res
        .status(200)
        .send({
          msg: "This Exersize is allready Present So please change the Name of Exersize",
          error: true,
        });
    } else {
      const hotel = new WorkOutModel(payload);
      await hotel.save();
      res.send({ msg: "Exersize Data is created" });
    }
  } catch (error) {
    res.status(400).send({ msg: "something went wrong", error });
    console.log(error);
  }
});

WorkOutRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  try {
      await WorkOutModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

WorkOutRoutes.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  const note = await WorkOutModel.findOne({ _id: Id });
  const hotelId = note.created_by;
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await WorkOutModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Hotel Data");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  WorkOutRoutes,
};
