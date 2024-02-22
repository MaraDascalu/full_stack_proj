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

// ! Author Schema
const authorSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);
// ! Compile the author model
const Author = mongoose.model("Author", authorSchema);

// ! Books Schema
const booksSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});
// ! Compile the book schema to create the model
const Book = mongoose.model("Book", booksSchema);

// ! Create Atuhor
const createAuthor = async () => {
  try {
    const createRepsonse = await Author.create({
      name: "Mara",
    });
    console.log(createRepsonse);
    return createRepsonse;
  } catch (error) {
    console.log(error);
  }
};
const author = await createAuthor();

// ! Create Book
const createBook = async () => {
  try {
    const createResponse = await Book.create({
      title: "test",
      author: author._id,
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
