import appError from "../../utils/appError.js";
import User from "../../model/user/User.js";
import Post from "../../model/post/Post.js";

const createPost = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category || !req.file) {
      return res.render("posts/addPost", { error: "All fields are required!" });
    }

    const image = req.file.path;
    const userId = req.session.userAuth;

    // * create the post
    const post = await Post.create({
      title,
      description,
      category,
      image,
      user: userId,
    });

    // * add the post to user
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          posts: post,
        },
      },
      { new: true }
    );

    // * redirect to home page
    res.redirect("/");
  } catch (error) {
    return res.render("posts/addPost", { error: error.message });
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } });

    if (post) {
      res.render("posts/postDetails", { post, error: "", message: "" });
    } else {
      next(appError("Invalid post ID!"));
    }
  } catch (error) {
    return next(appError(error.message));
  }
};

const deletePost = async (req, res, next) => {
  try {
    const userId = req.session.userAuth;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (post.user.toString() === userId) {
      const deletePost = await Post.findByIdAndDelete(postId);

      res.redirect("/");
    } else {
      res.render("posts/postDetails", {
        error: "You are not allowed to delete this post!",
        post,
        message: "",
      });
    }
  } catch (error) {
    res.render("posts/postDetails", {
      error: error.message,
      post: "",
      message: "",
    });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const userId = req.session.userAuth;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (post.user.toString() === userId) {
      const { title, description, category } = req.body;
      const image = req.file?.path;
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          description,
          category,
          image,
        },
        { new: true }
      );

      res.render("posts/postDetails", {
        post: updatedPost,
        error: "",
        message: "Your post was successfully updated!",
      });
    } else {
      next(appError("You are not allowed to update this post!"));
    }
  } catch (error) {
    return next(appError(error.message));
  }
};

const renderUpdateForm = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (post) {
      res.render("posts/updatePost", { post, error: "" });
    }
  } catch (error) {
    next(appError(error.message));
  }
};

export {
  createPost,
  deletePost,
  getPost,
  getPosts,
  renderUpdateForm,
  updatePost,
};
