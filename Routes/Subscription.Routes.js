const express = require("express");
const { SubscrptionModel } = require("../Model/subscription.model");
const SubscriptionRoutes = express.Router();

SubscriptionRoutes.post("/", (req, res) => {
  const newSubscription = new SubscrptionModel(req.body);
  newSubscription
    .save()
    .then((subscription) => {
      res.status(201).json(subscription);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create subscription" });
    });
});

SubscriptionRoutes.get("/", (req, res) => {
  SubscrptionModel.find()
    .then((subscriptions) => {
      res.status(200).json({data:subscriptions,total:subscriptions.length});
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch subscriptions" });
    });
});

// Route to get a specific subscription by ID
SubscriptionRoutes.get("/:id", (req, res) => {
  SubscrptionModel.findById(req.params.id)
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
SubscriptionRoutes.patch("/:id", (req, res) => {
  SubscrptionModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
SubscriptionRoutes.delete("/:id", (req, res) => {
  SubscrptionModel.findByIdAndRemove(req.params.id)
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
  SubscriptionRoutes,
};
