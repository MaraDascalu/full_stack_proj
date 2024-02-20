import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

//Plugin the ejs layout as a middleware
app.use(expressEjsLayouts);
app.set("layout", "layout/main-layout");

// Serve the static files/ folder (__dirname/ __filename ar dirrectly accessible in cjs files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

//Set the view engine as  ejs
app.set("view engine", "ejs");

//Render Home page/route
app.get("/", (req, res) => {
  res.render("home");
});

//Render About page/route
app.get("/about", (req, res) => {
  res.render("about");
});
//Render Contact page/route
app.get("/contact", (req, res) => {
  res.render("contact");
});
//Render Gallery page/route
app.get("/gallery", (req, res) => {
  res.render("gallery");
});

//404 Error handler
app.use((req, res, next) => {
  const error = new Error("Page Not Found");

  next(error);
});
app.use((err, req, res, next) => {
  console.log(err.message);
  res.render("error", { error: err.message });
});
//!Start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
