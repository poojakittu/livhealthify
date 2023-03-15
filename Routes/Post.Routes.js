const express = require("express");
const {PostModel, CommentModel}=require("../Model/Post.Model")




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
  


