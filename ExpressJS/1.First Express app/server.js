import express from "express";

// ! Instance
const app = express();

// ! Create the port
const PORT = 3000;

// ! Define the route handler
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// ! Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
