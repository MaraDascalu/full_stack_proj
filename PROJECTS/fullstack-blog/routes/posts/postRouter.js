import express from "express";
import isAuthenticated from "../../middlewares/protected.js";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  renderUpdateForm,
  updatePost,
} from "../../controllers/posts/postController.js";
import multer from "multer";
import storage from "../../config/cloudinary.js";

// ! Instance of multer
const upload = multer({ storage });

// ! Create the router
const postRouter = express.Router();

// Render new post form
postRouter.get("/new-post-form", isAuthenticated, (req, res) => {
  res.render("posts/addPost", { error: "" });
});

// Render update post form
postRouter.get("/update-post-form/:id", isAuthenticated, renderUpdateForm);

// Add a new post
postRouter.post("/", upload.single("image"), isAuthenticated, createPost);

// Get all posts
postRouter.get("/", isAuthenticated, getPosts);

// Get single post
postRouter.get("/:id", isAuthenticated, getPost);

// Delete post
postRouter.delete("/:id", isAuthenticated, deletePost);

// Update post
postRouter.put("/:id", upload.single("image"), isAuthenticated, updatePost);

export default postRouter;
