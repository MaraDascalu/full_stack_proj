import express from "express";
import {
  returnUser,
  updateUserPassword,
  updateUserProfile,
  uploadCoverPhoto,
  uploadProfilePhoto,
  userLogin,
  userLogout,
  userProfile,
  userRegister,
} from "../../controllers/users/userController.js";
import isAuthenticated from "../../middlewares/protected.js";
import storage from "../../config/cloudinary.js";
import multer from "multer";

// ! Instance of multer
const upload = multer({ storage });

// ! Create the router
const userRouter = express.Router();

// * Render login form
userRouter.get("/login", (req, res) => {
  res.render("users/login", { error: "" });
});

// * Render register form
userRouter.get("/register", (req, res) => {
  res.render("users/register", { error: "" });
});

// * Render profile and cover photo upload form
userRouter.get("/upload-profile-photo-form", isAuthenticated, (req, res) => {
  res.render("users/uploadProfilePhoto", { error: "" });
});

// * Render profile and cover photo upload form
userRouter.get("/upload-cover-photo-form", isAuthenticated, (req, res) => {
  res.render("users/uploadCoverPhoto", { error: "" });
});

// * Render profile and cover photo upload form
userRouter.get("/update-user-form", isAuthenticated, (req, res) => {
  res.render("users/updateProfile", { error: "" });
});

// * Render profile and cover photo upload form
userRouter.get("/update-user-pass-form", isAuthenticated, (req, res) => {
  res.render("users/updatePassword", { message: "", error: "" });
});

// * User Register
userRouter.post("/register", userRegister);

// * User Login
userRouter.post("/login", userLogin);

// * User Logout
userRouter.get("/logout", isAuthenticated, userLogout);

// * Get user profile
userRouter.get("/profile-page", isAuthenticated, userProfile);

// * Get user details
userRouter.get("/:id", isAuthenticated, returnUser);

// * Upload user profile picture
userRouter.put(
  "/profile-photo-upload",
  upload.single("profile"),
  isAuthenticated,
  uploadProfilePhoto
);

// * Upload user cover picture
userRouter.put(
  "/cover-photo-upload",
  upload.single("cover"),
  isAuthenticated,
  uploadCoverPhoto
);

// * Update user profile
userRouter.put("/update", isAuthenticated, updateUserProfile);

// * Update user password
userRouter.put("/update-pass", isAuthenticated, updateUserPassword);

export default userRouter;
