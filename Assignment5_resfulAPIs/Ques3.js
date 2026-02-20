const express = require("express");

const app = express();
app.use(express.json());

const books = [
  { id: 1, title: "Java Basics", author: "Ashutosh", year: 2020 },
  { id: 2, title: "Node Mastery", author: "Rahul", year: 2021 },
  { id: 3, title: "DSA Complete Guide", author: "Aman", year: 2022 },
  { id: 4, title: "Web Development", author: "Ashutosh", year: 2023 },
  { id: 5, title: "System Design", author: "Rahul", year: 2022 },
  { id: 6, title: "React Guide", author: "Kunal", year: 2021 },
  { id: 7, title: "Spring Boot", author: "Ankit", year: 2020 },
  { id: 8, title: "Microservices", author: "Rahul", year: 2023 },
  { id: 9, title: "Cloud Computing", author: "Aman", year: 2022 },
  { id: 10, title: "AI Basics", author: "Ashutosh", year: 2024 },
  { id: 11, title: "DevOps Handbook", author: "Kunal", year: 2023 }
];

const validateYear = (req, res, next) => {
  const { year } = req.query;
  if (!year) return next();

  const parsedYear = parseInt(year);
  const currentYear = new Date().getFullYear();

  if (isNaN(parsedYear))
    return res.status(400).json({ error: "Year must be a valid number" });

  if (parsedYear < 1900 || parsedYear > currentYear)
    return res.status(400).json({
      error: `Year must be between 1900 and ${currentYear}`
    });

  next();
};

app.get("/books", validateYear, (req, res) => {
  let filteredBooks = books;

  const { author, year, page = 1, limit = 5 } = req.query;

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

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  if (isNaN(pageNumber) || pageNumber < 1)
    return res.status(400).json({ error: "Invalid page number" });

  if (isNaN(limitNumber) || limitNumber < 1)
    return res.status(400).json({ error: "Invalid limit number" });

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;

  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  res.json({
    totalBooks: filteredBooks.length,
    currentPage: pageNumber,
    totalPages: Math.ceil(filteredBooks.length / limitNumber),
    data: paginatedBooks
  });
});


app.listen(3000, () => {
  console.log("Server running ");
});
