import express from "express";
import {
  createPost,
  listAllPosts,
  showCreateForm,
} from "../controllers/postController.js";

// Create the router
const postRouter = express.Router();

//! Show the create form
postRouter.get("/create", showCreateForm);

//! To get all posts
postRouter.get("/list", listAllPosts);

//! Create the post (The main logic)
postRouter.post("/create", createPost);

export default postRouter;
