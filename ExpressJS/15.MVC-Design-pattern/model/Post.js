import mongoose from "mongoose";

//---Post model
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
});
const Post = mongoose.model("Post", postSchema);

export default Post;
