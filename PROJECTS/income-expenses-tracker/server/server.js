import cors from "cors";
import express from "express";
import userRoute from "./routes/user.js";
import accountRoute from "./routes/account.js";
import transactionRoute from "./routes/transactions.js";
import { connectDB } from "./config/connectDB.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const { EXPRESS_PORT } = process.env;
const app = express();

// ! Database connection
connectDB();

// ! Middlewares
app.use(express.json());
app.use(cors());

// ! Routes
app.use("/api/v1/users/", userRoute);
app.use("/api/v1/accounts/", accountRoute);
app.use("/api/v1/transactions/", transactionRoute);

// ! Error handler
app.use(errorHandler);

// ! Start the server
app.listen(
  EXPRESS_PORT,
  console.log(`The server is running on port ${EXPRESS_PORT}`)
);
