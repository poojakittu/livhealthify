const mongoose = require('mongoose');

const postSchema =  mongoose.Schema(
{
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }
}
);

const PostModel = mongoose.model('Post', postSchema);

const likeSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const LikeModel = mongoose.model('Like', likeSchema);

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true }
  
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = { PostModel, LikeModel, CommentModel };