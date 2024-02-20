import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Serve the static files/ folder (__dirname/ __filename ar dirrectly accessible in cjs files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

// Set the view engine as EJS
app.set("view engine", "ejs");

// * Render Home page/ route
app.get("/", (req, res) => {
  res.render("home");
});

// * Render About page/ route
app.get("/about", (req, res) => {
  res.render("about");
});

// * Render Contact page/ route
app.get("/contact", (req, res) => {
  res.render("contact");
});

// * Render Gallery page/ route
app.get("/gallery", (req, res) => {
  res.render("gallery");
});

// * Render user data page/ route
app.get("/user", (req, res) => {
  const userData = {
    userName: "Alice",
    age: 25,
    isPremiumUser: false,
  };

  res.render("userData", userData);
});

// * Render products page/ route
app.get("/products", (req, res) => {
  const products = [
    { name: "Laptop", price: 999 },
    { name: "Phone", price: 799 },
    { name: "TV", price: 1099 },
  ];
  res.render("products", { products });
});

// ! Start the server
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}!`);
});
