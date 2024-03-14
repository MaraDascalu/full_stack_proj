import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
} from "../controllers/transactions.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const transactionRoute = express.Router();

// Create transaction route
transactionRoute.post("/", isAuthenticated, createTransaction);

// Get transactions route
transactionRoute.get("/", isAuthenticated, getTransactions);

// Get transaction route
transactionRoute.get("/:id", isAuthenticated, getTransaction);

// Delete transaction route
transactionRoute.delete("/:id", isAuthenticated, deleteTransaction);

// Update transaction route
transactionRoute.put("/:id", isAuthenticated, updateTransaction);

export default transactionRoute;
