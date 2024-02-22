import express from "express";
import mongoose from "mongoose";

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, EXPRESS_PORT } =
  process.env;
const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.lzthrjh.mongodb.net/books-database`
    );
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

//!. Design Our Schema
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      set: (value) => value.trim(),
    },
    author: {
      type: String,
      required: true,
      set: (value) => value.trim(),
    },
    price: {
      type: Number,
      required: true,
      set: (value) => Math.round(value * 100) / 100,
    },
    url: {
      type: [String],
      required: true,
      set: (value) => `http://masyntech/books/${value}`,
    },
  },
  {
    timestamps: true,
  }
);

//! Compile the schema to create the model
const Book = mongoose.model("Book", bookSchema);

//!Create user
const createBook = async () => {
  try {
    const createResponse = await Book.create({
      title: "Simple title",
      author: "By me",
      price: 11.455,
      tags: ["cool", "new"],
      url: "simple-book",
    });
    console.log(createResponse);
  } catch (error) {
    console.log(error);
  }
};
createBook();

// ! Start the server
app.listen(EXPRESS_PORT, () => {
  console.log(`The server is running on port ${EXPRESS_PORT}`);
});
