import Comment from "../../model/comment/Comment.js";
import Post from "../../model/post/Post.js";
import User from "../../model/user/User.js";
import appError from "../../utils/appError.js";

const createComment = async (req, res, next) => {
  try {
    const { message } = req.body;
    const postId = req.params.id;
    const userId = req.session.userAuth;

    // * create comment
    const comment = await Comment.create({
      user: userId,
      message,
    });

    // * add comment to user object
    const user = await User.findByIdAndUpdate(userId, {
      $push: { comments: comment },
    });

    // * add comment to post object
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: comment },
      },
      { new: true }
    ).populate({ path: "comments", populate: { path: "user" } });

    res.render("posts/postDetails", {
      post,
      error: "",
      message: "Your comment was successfully added!",
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();

    res.json({
      status: "success",
      data: comments,
    });
  } catch (error) {
    next(appError(error.message));
  }
};

const getComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);

    if (comment) {
      res.json({
        status: "success",
        data: comment,
      });
    } else {
      next(appError("Invalid comment ID!"));
    }
  } catch (error) {
    next(appError(error.message));
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const userId = req.session.userAuth;
    const postId = req.query.postId;

    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);

    if (comment && comment.user.toString() === userId) {
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      const post = await Post.findById(postId)
        .populate("user")
        .populate({ path: "comments", populate: { path: "user" } });

      res.render("posts/postDetails", {
        post,
        message: "Your message was successfully deleted!",
        error: "",
      });
    } else {
      const post = await Post.findById(postId)
        .populate("user")
        .populate({ path: "comments", populate: { path: "user" } });
      res.render("posts/postDetails", {
        post,
        message: "",
        error: "You are not allowed to delete this comment!",
      });
    }
  } catch (error) {
    next(appError(error.message));
  }
};

const updateComment = async (req, res, next) => {
  try {
    const userId = req.session.userAuth;
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);

    if (comment && comment.user.toString() === userId) {
      const { message } = req.body;
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
          message,
        },
        { new: true }
      );

      res.render("posts/postDetails", {
        post,
        message: "Your comment was successfully updated",
        error: "",
      });
    } else {
      next(appError("You are not allowed to update this comment!"));
    }
  } catch (error) {
    next(appError(error.message));
  }
};

const renderUpdateForm = async (req, res, next) => {
  try {
    const commId = req.params.id;
    const comment = await Comment.findById(commId);

    if (comment) {
      res.render("comments/updateComment", { comment, error: "" });
    }
  } catch (error) {
    next(appError(error.message));
  }
};

export {
  createComment,
  deleteComment,
  getComment,
  getComments,
  renderUpdateForm,
  updateComment,
};
