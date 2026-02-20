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
  res.json(books);
});

app.get("/books/search", (req, res) => {
  const { title } = req.query;

  if (!title)
    return res.status(400).json({ message: "Title query parameter is required" });

  const results = books.filter(book =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );

  if (results.length === 0)
    return res.status(404).json({ message: "No books found" });

  res.json(results);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
