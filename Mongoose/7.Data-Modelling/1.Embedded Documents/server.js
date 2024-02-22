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

// ! Address Schema
const addressSchema = new mongoose.Schema(
  {
    stree: String,
    city: String,
    state: String,
    zipcode: Number,
  },
  { timestamps: true }
);

// ! User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: addressSchema,
});

// ! Compile the user schema to create the model
const User = mongoose.model("User", userSchema);

// ! Create user
const createUser = async () => {
  try {
    const createResponse = await User.create({
      name: "Emma",
      email: "emma@gmail.com",
      address: {
        street: "street",
        city: "city",
        state: "state",
        zipcode: 112233,
      },
    });
    console.log(createResponse);
  } catch (error) {
    console.log(error);
  }
};
createUser();

// ! Start the server
app.listen(EXPRESS_PORT, () => {
  console.log(`The server is running on port ${EXPRESS_PORT}`);
});
