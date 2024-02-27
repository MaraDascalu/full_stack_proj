import express from "express";
import mongoose from "mongoose";
import postRouter from "./router/postRouter.js";

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, EXPRESS_PORT } =
  process.env;
const app = express();
const mongoConnectionString = `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.lzthrjh.mongodb.net/mvc-desing-pattern`;

//-----Connect DB------
const connectDB = async () => {
  try {
    await mongoose.connect(mongoConnectionString);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

//!Configure ejs
app.set("view engine", "ejs");
//!Middlewares
app.use(express.urlencoded({ extended: true }));

//!. Show Homepage
app.get("/", (req, res) => {
  res.render("index");
});

// ! Router
app.use("/", postRouter);

//Start the server
app.listen(
  EXPRESS_PORT,
  console.log(`The server is running on port ${EXPRESS_PORT}`)
);
