import express from "express";

const postRouter = express.Router();

postRouter.get("/", (req, res) => {
  res.json({
    message: "All Posts",
  });
});

export default postRouter;
