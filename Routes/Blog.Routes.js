const express = require("express");
const { authenticate } = require("../middleware/authentication.middleware");
const { BlogModel } = require("../Model/Blog.Model");
const BlogRoutes = express.Router();



BlogRoutes.get("/allblogs", async (req, res) => {
    const payload = req.body;
    try {
      const product = await BlogModel.find();
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


BlogRoutes.get("/", authenticate, async (req, res) => {
  const payload = req.body;
  try {
    const product = await BlogModel.find({ vendorId: payload.vendorId });
    console.log(product);
    res.send({ data: product,total:product.length });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

BlogRoutes.get("allproductdata/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await BlogModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

BlogRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await BlogModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

BlogRoutes.post("/add", authenticate, async (req, res) => {
    try {
      let data = req.body;
      let data1 = new BlogModel(data);
      let saved = await data1.save();
  
      res.send({ msg: "Data Added" });
    } catch (err) {
      res.send({ msg: "could not add Data" });
    }
  });

BlogRoutes.patch("/update/:id", authenticate, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  const data = await BlogModel.findOne({ _id: Id });
  console.log(data.vendorId)

  try {
    if (JSON.stringify(data.vendorId)!== JSON.stringify(req.body.vendorId)) {
      res.send({ msg: "You are not authorized" });
    } else {
      await BlogModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

BlogRoutes.delete("/delete/:id", authenticate, async (req, res) => {
    const Id = req.params.id;
    const payload = req.body;
  
    const data = await BlogModel.findOne({ _id: Id });
    console.log(data.vendorId)
  
    try {
      if (JSON.stringify(data.vendorId)!== JSON.stringify(req.body.vendorId)) {
        res.send({ msg: "You are not authorized" });
      } else {
      await BlogModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Hotel Data");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  BlogRoutes,
};
