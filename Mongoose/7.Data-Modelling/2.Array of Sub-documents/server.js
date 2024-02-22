import express from "express";
import mongoose from "mongoose";

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, EXPRESS_PORT } =
  process.env;
const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.lzthrjh.mongodb.net/school-database`
    );
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

// ! Students Schema
const studentsSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String,
});

// ! Classroom Schema
const classroomSchema = new mongoose.Schema(
  {
    name: String,
    students: [studentsSchema],
  },
  { timestamps: true }
);

//! Compile the user schema to create the model
const Classroom = mongoose.model("Classroom", classroomSchema);

//!Create Classroom
const createClass = async () => {
  try {
    const createResponse = await Classroom.create({
      name: "Math",
      students: [
        {
          name: "Emma",
          age: 18,
          grade: "A",
        },
        {
          name: "Alice",
          age: 19,
          grade: "A+",
        },
        {
          name: "Bob",
          age: 20,
          grade: "B",
        },
      ],
    });
    console.log(createResponse);
  } catch (error) {
    console.log(error);
  }
};
createClass();

// ! Start the server
app.listen(EXPRESS_PORT, () => {
  console.log(`The server is running on port ${EXPRESS_PORT}`);
});
