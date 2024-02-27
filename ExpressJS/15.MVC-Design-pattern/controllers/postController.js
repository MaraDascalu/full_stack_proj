import Post from "../model/Post.js";

const showCreateForm = async (req, res) => {
  res.render("createPost");
};

const listAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.render("list", { posts });
};

const createPost = async (req, res) => {
  const { title, content, author } = req.body;
  await Post.create({
    title,
    content,
    author,
  });
  //redirect to the post list
  res.redirect("/list");
};

export { createPost, listAllPosts, showCreateForm };
