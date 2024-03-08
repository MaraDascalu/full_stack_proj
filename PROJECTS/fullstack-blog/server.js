import commentRouter from "./routes/comments/commentRouter.js";
import express from "express";
import { fileURLToPath } from "url";
import session from "express-session";
import path from "path";
import postRouter from "./routes/posts/postRouter.js";
import userRouter from "./routes/users/userRouter.js";
import methodOverride from "method-override";
import MongoStore from "connect-mongo";
import { globalErrorHandler } from "./middlewares/globalHandler.js";
import connectDB from "./config/dbConnection.js";
import Post from "./model/post/Post.js";
import { truncatePost } from "./utils/helpers.js";

const {
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  EXPRESS_PORT,
  SESSION_KEY,
} = process.env;
const app = express();
const connectionString = `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.lzthrjh.mongodb.net/blog-database`;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ! Helpers
app.locals.truncatePost = truncatePost;

// ! Connect to MongoDB
connectDB();

// ! Configure Express Session
app.use(
  session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    // Used to store the current in db so it is not lost when the server is restarted
    store: MongoStore.create({
      mongoUrl: connectionString,
    }),
  })
);

// ! Save the logged in user into  the locals
app.use((req, res, next) => {
  const userId = req.session.userAuth;
  if (userId) {
    res.locals.userAuth = userId;
  } else {
    res.locals.userAuth = null;
  }
  next();
});

// ! Configure ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// ! Render pages
// ? render home page
app.get("/", async (req, res) => {
  // * get all posts
  const posts = await Post.find().populate("user");

  res.render("index", { posts });
});

// ! Middlewares
app.use(express.json()); //pass incoming data
app.use(express.urlencoded({ extended: true })); //pass form data

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

// ! Error handler middleware
app.use(globalErrorHandler);

// ! Start the server
app.listen(
  EXPRESS_PORT,
  console.log(`The server is running on port ${EXPRESS_PORT}`)
);
