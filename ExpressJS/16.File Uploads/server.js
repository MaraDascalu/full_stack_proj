import { v2 as cloudinary } from "cloudinary";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  EXPRESS_PORT,
} = process.env;
const app = express();

// ! Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.lzthrjh.mongodb.net/image-upload`
    );
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

// Image Schema
const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});
// Model
const Image = mongoose.model("Image", imageSchema);

// ! Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// ! Configure milter storage cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images-folder",
    format: async (req, file) => "png",
    public_id: (req, file) => file.fieldname + "_" + Date.now(),
    transformation: [
      {
        width: 800,
        height: 600,
        crop: "fill",
      },
    ],
  },
});

// ! Configure Multer
const upload = multer({
  storage,
  limits: 1024 * 1024 * 5, //5MB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image", false));
    }
  },
});

// * Upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  const uploaded = await Image.create({
    url: req.file.path,
    public_id: req.file.filename,
  });
  res.json({ message: "File Upload", uploaded });
});

// * Get all images
app.get("/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.json(error);
  }
});

// ! Start the server
app.listen(
  EXPRESS_PORT,
  console.log(`The serveris running on port ${EXPRESS_PORT}`)
);
