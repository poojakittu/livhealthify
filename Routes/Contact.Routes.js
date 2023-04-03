const express = require("express");
const { ContactModel } = require("../Model/Contact.model");


const ContactRoutes = express.Router();



ContactRoutes.get("/", async (req, res) => {
    try {
      const product = await ContactModel.find();
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



ContactRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ContactModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});


ContactRoutes.post("/add", async (req, res) => {
  try {
    let data = req.body;
    let data1 = new ContactModel(data);
    let saved = await data1.save();

    res.send({ msg: "Data Added" });
  } catch (err) {
    res.send({ msg: "could not add Data" });
  }
});

ContactRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  try {

      await ContactModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });

  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

ContactRoutes.delete("/delete/:id", async (req, res) => {
    const Id = req.params.id;
    const payload = req.body;
  
    try {
  
        await ContactModel.findByIdAndDelete({ _id: Id }, payload);
        res.send({ msg: "Deleted Sucessfully" });
  
    } catch (err) {
      console.log(err);
      res.send({ err: "Something went wrong" });
    }
});

module.exports = {
  ContactRoutes,
};
