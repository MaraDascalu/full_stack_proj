import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXPRESS_PORT = 8080;

// ! Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ! Set the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Simulated database of users
const users = [
  { username: "john", password: "123", role: "admin" },
  { username: "emma", password: "222", role: "user" },
];

// * Home route
app.get("/", (req, res) => {
  res.render("home");
});

// * Login route (render page)
app.get("/login", (req, res) => {
  res.render("login");
});

// * Login route (login logic)
app.post("/login", (req, res) => {
  // ? Find the user login details
  const userFound = users.find((user) => {
    const { username, password } = req.body;
    return user.username === username && user.password === password;
  });

  // ? Create cookies
  res.cookie("userData", JSON.stringify(userFound), {
    maxAge: 3 * 24 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  // ? Render dashboard
  if (userFound) {
    res.redirect("/dashboard");
  }
  // ? Redirect user to login page
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
