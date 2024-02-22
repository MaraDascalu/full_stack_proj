import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, EXPRESS_PORT } =
  process.env;
const app = express();

// ! Connect to MongoDB
const client = new MongoClient(
  `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.lzthrjh.mongodb.net/students-database`,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("successfully connected to MongoDB");

    // 1. Database creation
    const database = client.db("masyntech-school");

    // ! CREATE OPERATIONS
    // ? 2. Create books collection
    const students = database.collection("students");

    // ? 3. Add a new student (usign iinsertOne)
    const addOneResult = await students.insertOne({
      name: "Mirel",
      age: 20,
      subjects: ["Math", "Phisics"],
    });
    console.log(addOneResult);

    // ? 3'. Add new students (usign insertMany)
    // const addManyResult = await students.insertMany([
    //   {
    //     name: "Mirel",
    //     age: 18,
    //     gender: "male",
    //     subjects: ["Sports", "Lecture"],
    //   },
    //   {
    //     name: "Erika",
    //     age: 18,
    //     grade: "B",
    //     subjects: ["Business", "Marketing"],
    //   },
    // ]);
    // console.log(addManyResult);

    // ! READ OPERATIONS

    // ? find()
    // const findResult = await students.find().toArray();
    // console.log(findResult);

    // ? findOne()
    // const findOneResult = await students.findOne({ age: 20 });
    // console.log(findOneResult);

    // ! UPDATE OPERATIONS

    // ? updateOne()
    // const updtaeResponse = await students.updateOne(
    //   { name: "Bob" },
    //   { $set: { grade: "A" } }
    // );
    // console.log(updtaeResponse);

    // ? updateMany()
    // const updateManyResult = await students.updateMany(
    //   { age: 20 },
    //   { $set: { ableToDrive: false } }
    // );
    // console.log(updateManyResult);

    // ? findOneAndUpdate()
    // const findOneAndUpdateResult = await students.findOneAndUpdate(
    //   { grade: "A" },
    //   { $set: { grade: "C" } }
    // );
    // console.log(findOneAndUpdateResult);

    // ! DELETE OPERATIONS

    // ? deleteOne()
    // const deleteOneResponse = await students.deleteOne({ name: "Bob" });
    // console.log(deleteOneResponse);

    // ? deleteMany()
    // const deleteManyResult = await students.deleteMany({ age: 18 });
    // console.log(deleteManyResult);

    // ? findOneAndDelete()
    // const findOneAndDeleteResult = await students.findOneAndDelete({
    //   name: "Mirel",
    // });
    // console.log(findOneAndDeleteResult);
  } catch (error) {
    console.log(error);
  }
};
connectDB();

// ! Start the server
app.listen(EXPRESS_PORT, () => {
  console.log(`The server started on port ${EXPRESS_PORT}`);
});
