import express from "express";
import mongoose from "mongoose";
import validator from "validator";

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

// ! Design Our Schema
const userSchema = new mongoose.Schema(
  {
    age: {
      type: String,
      required: [true, "Please username is required"],
      validate: {
        validator: (value) => {
          return validator.isInt(value, { min: 0, max: 120 });
        },
        message: "Invalid age!",
      },
    },
    email: {
      type: String,
      required: [true, "Please email is required"],
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: "Invalid email!",
      },
    },
  },
  { timestamps: true }
);

// ! Compile the schema to create the model
const User = mongoose.model("User", userSchema);

// ! Create user
const createUser = async () => {
  try {
    const createResponse = await User.create({
      age: "100",
      email: "gigel@test.tst",
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
