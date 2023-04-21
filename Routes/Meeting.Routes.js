const express = require("express");
const { MeetingModel } = require("../Model/Meeting.Model");
const { authenticate } = require("../middleware/authentication.middleware");
const MeetingRoutes = express.Router();
// Update the path as per your project structure

// GET route to retrieve all meals
MeetingRoutes.get("/", async (req, res) => {
  try {
    const meals = await MeetingModel.find();
    res.send({ data: meals, total: meals.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

MeetingRoutes.get("/coachmeet",authenticate, async (req, res) => {
  try {
    const meals = await MeetingModel.find({coachId:req.body.vendorId});
    res.send({ data: meals, total: meals.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// MeetingRoutes.get("/usermeal/:id", async (req, res) => {
//   const Id = req.params.id;
//   try {
//     const meals = await MeetingModel.find({ userId: Id });
//     res.json(meals);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// POST route to create a new meal
MeetingRoutes.post("/add", authenticate, async (req, res) => {
  const payload = req.body;
  payload.coachId=req.body.vendorId;

  const meal = new MeetingModel(payload);
  try {
    console.log(meal);
    const newMeal = await meal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET route to retrieve a meal by ID
MeetingRoutes.get("/:id", async (req, res) => {
  try {
    const meal = await MeetingModel.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT route to update a meal by ID
MeetingRoutes.put("/:id",authenticate, async (req, res) => {
  try {
    const updatedMeal = await MeetingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.json(updatedMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE route to delete a meal by ID
MeetingRoutes.delete("/:id",authenticate, async (req, res) => {
  try {
    const deletedMeal = await MeetingModel.findByIdAndDelete(req.params.id);
    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.json(deletedMeal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { MeetingRoutes };
