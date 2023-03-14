const express = require("express");
const {PostModel, CommentModel}=require("../Model/Post.Model")




const PostRoutes=express.Router();





// const upload = multer({ storage });


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
  


