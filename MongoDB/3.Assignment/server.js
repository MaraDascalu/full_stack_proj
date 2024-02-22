import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, EXPRESS_PORT } =
  process.env;
const app = express();

const client = new MongoClient(
  `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.lzthrjh.mongodb.net/students-database`,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      deprecationErrors: true,
      strict: true,
    },
  }
);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("successfully connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

async function routes() {
  connectDB();

  const database = client.db("flower-shop");
  const flowers = database.collection("flowers");

  // Add flowers
  const availableFlowers = [
    { name: "Tulips", price: 2, qty: 10 },
    { name: "Roses", price: 4, qty: 25 },
    { name: "Violets", price: 2.5, qty: 40 },
  ];

  const insertManyResult = await flowers.insertMany(availableFlowers);
  console.log(insertManyResult);

  // Return the flowers that have a price greater or equal to $2.5

  const findResult = await flowers.find({ price: { $gte: 2.5 } }).toArray();
  console.log(findResult);
}

routes();

// ! Start the server
app.listen(EXPRESS_PORT, () => {
  console.log(`The server is running on port ${EXPRESS_PORT}`);
});
