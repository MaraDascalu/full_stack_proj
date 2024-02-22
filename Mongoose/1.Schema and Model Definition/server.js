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

// ! Design schema
const userProfileSchema = new mongoose.Schema({
  username: String,
  age: Number,
  birth: Date,
  isActive: Boolean,
  hobbies: [String],
  address: {
    street: String,
    city: String,
    postcode: Number,
  },
  customData: mongoose.Schema.Types.Mixed,
});
// ! Compile the schema to create the model
const User = mongoose.model("User", userProfileSchema);

// ! Start the server
app.listen(EXPRESS_PORT, () => {
  console.log(`The server is running on port ${EXPRESS_PORT}`);
});
