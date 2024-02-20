import express from "express";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";

const app = express();
const PORT = 3000;

//Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the main app",
  });
});

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
