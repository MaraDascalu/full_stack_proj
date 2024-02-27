import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, EXPRESS_PORT } =
  process.env;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mongoConnectionString = `mongodb+srv://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@cluster0.lzthrjh.mongodb.net/user-auth-database`;

// ! Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //passes the cookies from the browser to the server
// * custom middleware
const isAuthenticated = (req, res, next) => {
  // ? Check user in session
  const token = req.cookies ? req.cookies.token : null;
  if (!token) {
    return res.redirect("/login");
  }

  jwt.verify(token, "anykey", (err, decoded) => {
    if (err) {
      return res.redirect("/login");
    }
    req.userData = decoded;
    return next();
  });
};

const isAdmin = (req, res, next) => {
  // ? Check user in session
  const token = req?.cookies?.token;

  jwt.verify(token, "anykey", (err, decoded) => {
    if (err) {
      return res.redirect("/login");
    }

    const admin = decoded.role === "admin";

    if (admin) {
      return next();
    } else {
      res.send("You can not access this page!");
    }
  });
};

// ! Set the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ! Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoConnectionString);
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

// * Admin route
app.get("/admin-only", isAuthenticated, isAdmin, (req, res) => {
  res.render("admin");
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
    // ? Generate the token
    const token = jwt.sign(
      {
        username: userFound.username,
        role: userFound.role,
      },
      "anykey",
      {
        expiresIn: "3d",
      }
    );
    // ? Save the token into the cookie
    res.cookie("token", token),
      {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      };
    // ? Render dashboard
    res.redirect("/dashboard");
  } else {
    // ? Redirect user to login page
    res.redirect("/register");
  }
});

// * Dashboard route
app.get("/dashboard", isAuthenticated, (req, res) => {
  const username = req.userData ? req.userData.username : null;
  if (username) {
    res.render("dashboard", { username });
  } else {
    res.redirect("/login");
  }
});

// * Logout route
app.get("/logout", (req, res) => {
  // ? Logout
  // ? Redirect
  res.redirect("/login");
});

// ! Start the server
app.listen(EXPRESS_PORT, () => {
  console.log(`The server started on port ${EXPRESS_PORT}`);
});
