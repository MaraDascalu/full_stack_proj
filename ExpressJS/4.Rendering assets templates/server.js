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

// * Render Home page/ route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// * Render About page/ route
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

// * Render Contact page/ route
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

// * Render Gallery page/ route
app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "gallery.html"));
});

// ! Start the server
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}!`);
});
