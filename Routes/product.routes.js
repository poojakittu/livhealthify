const express = require("express");

const ProductRoutes = express.Router();

const { ProductModel } = require("../Model/product.Model");


ProductRoutes.get("/all", async (req, res) => {
  const payload = req.body;
  try {
    const product = await ProductModel.find();
    console.log(product);
    res.send({ data: product, total: product.length });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

ProductRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

ProductRoutes.post("/add",async (req, res) => {
 let data = req.body;
  try {
    let data1 = new ProductModel(data);
    let x=await data1.save()
    res.send(x);
  } catch (err) {
    res.send({ msg: "could not add Data" });
  }
});

ProductRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
  try {
   
      await ProductModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });

  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

ProductRoutes.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
  try {
   
      await ProductModel.findByIdAndDelete({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });

  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = {
  ProductRoutes,
};
