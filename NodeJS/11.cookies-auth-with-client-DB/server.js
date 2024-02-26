import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, EXPRESS_PORT } =
  process.env;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ! Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ! Set the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ! Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.lzthrjh.mongodb.net/user-auth-database`
    );
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

// ! Create User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

// ! create the User model
const User = mongoose.model("User", userSchema);

// * Home route
app.get("/", (req, res) => {
  res.render("home");
});

// * Register route (render page)
app.get("/register", (req, res) => {
  res.render("register");
});

// * Register route (register logic)
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const userExists = await User.findOne({ username });

  if (!userExists) {
    const createResponse = await User.create({
      username,
      password: hashPassword,
    });
    console.log(createResponse);
    res.redirect("/login");
  } else {
    res.redirect("/register");
    console.log("This username already exists!");
  }
});

// * Login route (render page)
app.get("/login", (req, res) => {
  res.render("login");
});

// * Login route (login logic)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // ? Find the user login details
  const userFound = await User.findOne({ username });

  if (userFound && (await bcrypt.compare(password, userFound.password))) {
    // ? Create cookies
    res.cookie("userData", JSON.stringify(userFound), {
      maxAge: 3 * 24 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    // ? Render dashboard
    res.redirect("/dashboard");
  } else {
    // ? Redirect user to login page
    res.redirect("/register");
  }
});

// * Dashboard route
app.get("/dashboard", (req, res) => {
  // ? Grab user cookies
  const userData = req.cookies.userData
    ? JSON.parse(req.cookies.userData)
    : null;

  const username = userData ? userData.username : null;

  // ? Render the template
  if (username) {
    res.render("dashboard", { username });
  } else {
    // ? Redirect to login
    res.redirect("/login");
  }
});

// * Logout route
app.get("/logout", (req, res) => {
  // ? Logout
  res.clearCookie("userData");

  // ? Redirect
  res.redirect("/login");
});

// ! Start the server
app.listen(EXPRESS_PORT, () => {
  console.log(`The server started on port ${EXPRESS_PORT}`);
});
