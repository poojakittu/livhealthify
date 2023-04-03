const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  like: { type: Number, default: 0 },
  comment: [
    {
      comments: { type: String },
      date: { type: String },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  postdate: { type: String },
  time: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String },
});

const postModel = mongoose.model("post", postSchema);

module.exports = { postModel };
