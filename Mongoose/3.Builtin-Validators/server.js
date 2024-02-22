import express from "express";
import mongoose from "mongoose";

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, EXPRESS_PORT } =
  process.env;
const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.lzthrjh.mongodb.net/students-database`
    );
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

// ! Design User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please username is required"],
      unique: true,
      minLength: 3,
      maxLength: 10,
    },
    email: {
      type: String,
      required: [true, "Please email is required"],
      match: /@/,
    },
    age: {
      type: Number,
      min: 18,
      max: 65,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
  },
  { timestamps: true }
);

// ! Compile the schema to create the model
const User = mongoose.model("User", userSchema);

// ! Create user
const createUser = async () => {
  try {
    await User.create({});
  } catch (error) {
    console.log(error);
  }
};
createUser();

// ! Start the server
app.listen(EXPRESS_PORT, () => {
  console.log(`The server is running on port ${EXPRESS_PORT}`);
});
