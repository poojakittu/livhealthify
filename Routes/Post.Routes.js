const express = require("express");
const { postModel } = require("../Model/Post.Model");

const PostRoutes = express.Router();
PostRoutes.get("/", async (req, res) => {
  const payload = req.body;
  try {
    const product = await postModel.find();
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
    const product = await postModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

PostRoutes.post("/add", async (req, res) => {
  let x = new Date();
  let y = JSON.stringify(x);
  let bag = "";
  for (let i = 1; i <= 10; i++) {
    bag += y[i];
  }
  let time = "";
  for (let i = 12; i <= 20; i++) {
    time += y[i];
  }

  try {
    const post = new postModel({
      title: req.body.title,
      image: req.body.image,
      userId: "642a89efaaac34c46e36e8f9",
      date: x,
      postdate: bag,
      time: time,
    });
    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

PostRoutes.post("/addcomment/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const data = await postModel.findById(Id);
    data.comment.push({
      comments: req.body.comments,
      date: new Date().toISOString(),
      userId: "642a89efaaac34c46e36e8f9",
    });

    await data.save();
    res.send(data.comment);
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});
PostRoutes.post("/addlike/:id", async (req, res) => {
  const Id = req.params.id;
  const val = await postModel.find({ _id: Id });
  let x = val[0].like;
  payload = { like: x + 1 };

  try {
    const item = await postModel.findByIdAndUpdate({ _id: Id }, payload);
    res.send(item);
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

PostRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  try {
    await postModel.findByIdAndUpdate({ _id: Id }, payload);
    res.send({ msg: "updated Sucessfully" });
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

PostRoutes.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  const note = await postModel.findOne({ _id: Id });
  const hotelId = note.created_by;
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await postModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Hotel Data");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

PostRoutes.post("/addcomment", async (req, res) => {
  try {
    const post = new CommentModel({
      postId: req.body.postId,
      userId: req.body.userId,
      comment: req.body.comment,
    });

    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  PostRoutes,
};
