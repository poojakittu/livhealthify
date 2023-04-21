const express = require("express");
const { SubscriptionPlanModel } = require("../Model/SubscriptionPlan.Model");
const authMiddleware = require("../middleware/auth.middleware");

const SubscriptionPlanRoutes = express.Router();

SubscriptionPlanRoutes.post("/", authMiddleware, async (req, res) => {
  let x = new Date();
  try {
    const post = new SubscriptionPlanModel({
      title: req.body.title,
      duration: req.body.duration,
      startDate: x,
      endDate: x,
      userId: req.body.userId,
    });
    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

SubscriptionPlanRoutes.get("/",authMiddleware, (req, res) => {
  SubscriptionPlanModel.find({userId:req.body.userId})
    .then((subscriptions) => {
      res
        .status(200)
        .json({ data: subscriptions, total: subscriptions.length });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch subscriptions" });
    });
});

SubscriptionPlanRoutes.get("/all", (req, res) => {
    SubscriptionPlanModel.find()
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
SubscriptionPlanRoutes.get("/:id", (req, res) => {
  SubscriptionPlanModel.findById(req.params.id)
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
SubscriptionPlanRoutes.patch("/:id", (req, res) => {
  SubscriptionPlanModel.findByIdAndUpdate(req.params.id, req.body, {
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
SubscriptionPlanRoutes.delete("/:id", (req, res) => {
  SubscriptionPlanModel.findByIdAndRemove(req.params.id)
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
  SubscriptionPlanRoutes,
};
