const express = require("express");

const app = express();
app.use(express.json());

const books = [
  { id: 1, title: "Java Basics", author: "Ashutosh", year: 2020 },
  { id: 2, title: "Node Mastery", author: "Rahul", year: 2021 },
  { id: 3, title: "DSA Complete Guide", author: "Aman", year: 2022 },
  { id: 4, title: "Web Development", author: "Ashutosh", year: 2023 },
  { id: 5, title: "System Design", author: "Rahul", year: 2022 }
];

app.get("/books", (req, res) => {
  let filteredBooks = books;

  const { author, year } = req.query;

  if (author) {
    filteredBooks = filteredBooks.filter(
      book => book.author.toLowerCase() === author.toLowerCase()
    );
  }

  if (year) {
    filteredBooks = filteredBooks.filter(
      book => book.year === parseInt(year)
    );
  }

  if (filteredBooks.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }

  res.json(filteredBooks);
});

app.listen(3000, () => {
  console.log("Server running ");
});
