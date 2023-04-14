const express = require("express");
const MealRoutes = express.Router();
const { MealModel } = require("../Model/Mealplan.Model"); // Update the path as per your project structure

// GET route to retrieve all meals
MealRoutes.get("/", async (req, res) => {
  try {
    const meals = await MealModel.find();
    res.send({ data: meals, total: meals.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

MealRoutes.get("/usermeal/:id", async (req, res) => {
  const Id = req.params.id;
  try {
    const meals = await MealModel.find({ userId: Id });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to create a new meal
MealRoutes.post("/add", async (req, res) => {
  const meal = new MealModel(req.body);
  try {
    const newMeal = await meal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET route to retrieve a meal by ID
MealRoutes.get("/:id", async (req, res) => {
  try {
    const meal = await MealModel.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT route to update a meal by ID
MealRoutes.patch("/:id", async (req, res) => {
  try {
    const updatedMeal = await MealModel.findByIdAndUpdate(
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
MealRoutes.delete("/:id", async (req, res) => {
  try {
    const deletedMeal = await MealModel.findByIdAndDelete(req.params.id);
    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.json(deletedMeal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { MealRoutes };
