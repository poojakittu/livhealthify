const express = require("express");
const {PostModel, CommentModel}=require("../models/Post.Model")




const PostRoutes=express.Router();





// const upload = multer({ storage });
PostRoutes.get("/", async (req, res) => {
  const payload = req.body;
  try {
    const product = await PostModel.find();
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

PostRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await PostModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

PostRoutes.post('/add', async (req, res) => {
  try {
    const post = new PostModel({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    });

    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

PostRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  try {
      await PostModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

PostRoutes.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  const note = await PostModel.findOne({ _id: Id });
  const hotelId = note.created_by;
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await PostModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Hotel Data");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

PostRoutes.post('/addcomment', async (req, res) => {
  try {
    const post = new CommentModel({
      postId: req.body.postId,
      userId: req.body.userId,
      comment: req.body.comment
    });

    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});






  
  
  
  

  module.exports = {
    PostRoutes
  }
  


