let express = require("express");
let cors = require("cors");
let app = express();
let { getAllBooks, getBookById } = require("./controllers");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("Welcome to Books API");
});

app.get("/books", (req, res) => {
  let books = getAllBooks();
  res.status(200).json({ books });
});

app.get("/books/details/:id", (req, res) => {
  let bookId = parseInt(req.params.id);
  let book = getBookById(bookId);
  if (!book) return res.status(404).json({ message: "Book nor found" });

  res.status(200).json({ book });
});

module.exports = { app };
