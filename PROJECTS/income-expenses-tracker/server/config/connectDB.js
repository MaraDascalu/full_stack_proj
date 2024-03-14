import mongoose from "mongoose";

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.lzthrjh.mongodb.net/income-expenses-tracker`
    );
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.log(error.message);
  }
};

export { connectDB };
