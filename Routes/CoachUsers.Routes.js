const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { CoachUsersModel } = require("../Model/CoachUsers.Model");
const { authenticate } = require("../middleware/authentication.middleware");
const jwt = require("jsonwebtoken");
const { CoachModel } = require("../Model/coach.Model");

const CoachusersRoutes = express.Router();

CoachusersRoutes.get("/coach", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    res.send({ msg: "Please login first" });
  }

  const decoded = jwt.verify(token, process.env.key);

  try {
    const meals = await CoachUsersModel.find({ coachId: decoded.vendorId });
    res.send({ data: meals, total: meals.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

CoachusersRoutes.post("/", authMiddleware, async (req, res) => {
  let x = new Date();
  try {
    const post = new CoachUsersModel({
      coachId: req.body.coachId,
      date: x,
      userId: req.body.userId,
    });
    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

CoachusersRoutes.get("/", authMiddleware, async (req, res) => {
  const x = req.body.userId;
  try {
    const product = await CoachUsersModel.find({ userId: x });
    const data = await CoachModel.find({ _id: product[0].coachId });
   // console.log(product[0].coachId);
    res.send({ data: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

CoachusersRoutes.get("/all", (req, res) => {
  CoachUsersModel.find()
    .then((subscriptions) => {
      res
        .status(200)
        .json({ data: subscriptions, total: subscriptions.length });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch subscriptions" });
    });
});

// Route to get a specific subscription by ID
CoachusersRoutes.get("/:id", (req, res) => {
  CoachUsersModel.findById(req.params.id)
    .then((subscription) => {
      if (!subscription) {
        res.status(404).json({ error: "Subscription not found" });
      } else {
        res.status(200).json(subscription);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch subscription" });
    });
});

// Route to update a specific subscription by ID
CoachusersRoutes.patch("/:id", (req, res) => {
  CoachUsersModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((subscription) => {
      if (!subscription) {
        res.status(404).json({ error: "Subscription not found" });
      } else {
        res.status(200).json(subscription);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update subscription" });
    });
});

// Route to delete a specific subscription by ID
CoachusersRoutes.delete("/:id", (req, res) => {
  CoachUsersModel.findByIdAndRemove(req.params.id)
    .then((subscription) => {
      if (!subscription) {
        res.status(404).json({ error: "Subscription not found" });
      } else {
        res.status(200).json({ message: "Subscription deleted successfully" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete subscription" });
    });
});

module.exports = {
  CoachusersRoutes,
};
