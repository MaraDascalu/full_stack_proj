import express from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  renderUpdateForm,
  updateComment,
} from "../../controllers/comments/commentController.js";
import isAuthenticated from "../../middlewares/protected.js";

// ! Create the router
const commentRouter = express.Router();

// Render update comment form
commentRouter.get("/update-comm-form/:id", isAuthenticated, renderUpdateForm);

// Add a new comment
commentRouter.post("/:id", isAuthenticated, createComment);

// Get all comments
commentRouter.get("/", isAuthenticated, getComments);

// Get single comment
commentRouter.get("/:id", isAuthenticated, getComment);

// Delete comment
commentRouter.delete("/:id", isAuthenticated, deleteComment);

// Update comment
commentRouter.put("/:id", isAuthenticated, updateComment);

export default commentRouter;
