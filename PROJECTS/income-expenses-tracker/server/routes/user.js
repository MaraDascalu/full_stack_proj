import express from "express";
import {
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
  userProfile,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const userRoute = express.Router();

// Add new user
userRoute.post("/register", registerUser);

// Login user
userRoute.post("/login", loginUser);

// User profile
userRoute.get("/profile", isAuthenticated, userProfile);

// Delete user profile
userRoute.delete("/", isAuthenticated, deleteUser);

// Update user profile
userRoute.put("/profile", isAuthenticated, updateUser);

export default userRoute;
