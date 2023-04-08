const express = require("express");
const { postModel } = require("../Model/Post.Model");
const { weightModel } = require("../Model/weight.Model");
const authMiddleware = require("../middleware/auth.middleware");
const OtpModel = require("../Model/otp.model");

const WeightRoutes = express.Router();

WeightRoutes.get("/allweight", authMiddleware, async (req, res) => {
  try {
    const product = await weightModel.find({ userId: req.body.userId });
    
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

WeightRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await weightModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

WeightRoutes.post("/add", authMiddleware, async (req, res) => {
  let x = new Date();
  let y = JSON.stringify(x);
  let bag = "";
  for (let i = 1; i <= 10; i++) {
    bag += y[i];
  }

  let data = await weightModel.find({ userId: req.body.userId, date: bag });

  try {
    if (data.length == 0) {
      const post = new weightModel({
        weight: req.body.weight,
        userId: req.body.userId,
        date: bag,
      });

      const savedPost = await post.save();
      const currentweight = { currentweight: req.body.weight };
      await OtpModel.findByIdAndUpdate({ _id: req.body.userId }, currentweight);

      res.status(201).json(savedPost);
    } else {
      await weightModel.findByIdAndUpdate({ _id: data[0]._id }, req.body);
      const currentweight = { currentweight: req.body.weight };
      await OtpModel.findByIdAndUpdate({ _id: req.body.userId }, currentweight);
      res.status(201).json({ message: "Weigh Updated" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// WeightRoutes.post("/addcomment/:id", async (req, res) => {
//   const Id = req.params.id;

//   try {
//     const data = await postModel.findById(Id);
//     data.comment.push({
//       comments: req.body.comments,
//       date: new Date().toISOString(),
//       userId: "642a89efaaac34c46e36e8f9",
//     });

//     await data.save();
//     res.send(data.comment);
//   } catch (err) {
//     console.log(err);
//     res.send({ err: "Something went wrong" });
//   }
// });
// WeightRoutes.post("/addlike/:id", async (req, res) => {
//   const Id = req.params.id;
//   const val = await postModel.find({ _id: Id });
//   let x = val[0].like;
//   payload = { like: x + 1 };

//   try {
//     const item = await postModel.findByIdAndUpdate({ _id: Id }, payload);
//     res.send(item);
//   } catch (err) {
//     console.log(err);
//     res.send({ err: "Something went wrong" });
//   }
// });

// WeightRoutes.patch("/update/:id", async (req, res) => {
//   const Id = req.params.id;
//   const payload = req.body;

//   try {
//     await postModel.findByIdAndUpdate({ _id: Id }, payload);
//     res.send({ msg: "updated Sucessfully" });
//   } catch (err) {
//     console.log(err);
//     res.send({ err: "Something went wrong" });
//   }
// });

// WeightRoutes.delete("/delete/:id", async (req, res) => {
//   const Id = req.params.id;
//   const note = await postModel.findOne({ _id: Id });
//   const hotelId = note.created_by;
//   const userId_making_req = req.body.created_by;
//   try {
//     if (userId_making_req !== hotelId) {
//       res.send({ msg: "You are not Recognized" });
//     } else {
//       await postModel.findByIdAndDelete({ _id: Id });
//       res.send("Deleted the Hotel Data");
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ msg: "Something went wrong" });
//   }
// });

// WeightRoutes.post("/addcomment", async (req, res) => {
//   try {
//     const post = new CommentModel({
//       postId: req.body.postId,
//       userId: req.body.userId,
//       comment: req.body.comment,
//     });

//     const savedPost = await post.save();

//     res.status(201).json(savedPost);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = {
  WeightRoutes,
};
