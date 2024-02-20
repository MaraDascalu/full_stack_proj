import express from "express";

const app = express();
const PORT = 3000;

const books = [
  { id: 1, title: "The great Gatsby", author: "F. Scott" },
  { id: 2, title: "The Moby Dic", author: "Herman" },
  { id: 3, title: "The MERN Stack", author: "Masynctech" },
];

// ! Receiving incoming data
app.use(express.json());

// * Home route
app.get("/", (req, res) => {
  res.json({
    status: "200",
    message: "Welcome to my first API with Express.JS",
  });
});

// * Fetch all books
app.get("/books", (req, res) => {
  res.json({
    status: "200",
    message: "Books fetched successfully!",
    data: books,
  });
});

// * Fetch single book
app.get("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  const requestedBook = books.find((book) => {
    return book.id === parseInt(bookId);
  });
  if (requestedBook) {
    res.json({
      status: "200",
      message: "Books fetched successfully!",
      data: requestedBook,
    });
  } else {
    res.json({
      status: "401",
      message: "This id is invalid!",
    });
  }
});

// * Add a new book
app.post("/books", (req, res) => {
  const body = req.body;
  books.push(body);

  res.json({
    status: "200",
    message: "book was successfully added!",
    data: books,
  });
});

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
