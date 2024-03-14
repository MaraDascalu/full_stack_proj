import express from "express";
import {
  createAccount,
  deleteAccount,
  getAccount,
  updateAccount,
} from "../controllers/account.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const accountRoute = express.Router();

// Create account route
accountRoute.post("/", isAuthenticated, createAccount);

// Get single account route
accountRoute.get("/:id", isAuthenticated, getAccount);

// Delete account route
accountRoute.delete("/:id", isAuthenticated, deleteAccount);

// Update account route
accountRoute.put("/:id", isAuthenticated, updateAccount);

export default accountRoute;
