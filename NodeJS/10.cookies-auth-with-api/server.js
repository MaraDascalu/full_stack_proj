import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const EXPRESS_PORT = 8080;

// ! Middlewares
app.use(express.json());
app.use(cookieParser());

// Simulated database of users
const users = [
  { username: "john", password: "123", role: "admin" },
  { username: "emma", password: "222", role: "user" },
];

// * Home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// * Login route (render page)
app.get("/login", (req, res) => {
  res.json({ message: "This is the login page" });
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

  if (userFound) {
    res.json({ message: "Successfully logged in!" });
  } else {
    res.json({ message: "Login failed!" });
  }
});

// * Dashboard route
app.get("/dashboard", (req, res) => {
  // ? Grab user cookies
  const userData = req.cookies.userData
    ? JSON.parse(req.cookies.userData)
    : null;
  const username = userData ? userData.username : null;

  if (username) {
    res.json({ message: `Welcome, ${username}` });
  } else {
    res.json({ message: "Please login first!" });
  }
});

// * Logout route
app.get("/logout", (req, res) => {
  // ? Logout
  res.clearCookie("userData");

  // ? Redirect
  res.json({ message: "Successfully logged out!" });
});

// ! Start the server
app.listen(EXPRESS_PORT, () => {
  console.log(`The server started on port ${EXPRESS_PORT}`);
});
