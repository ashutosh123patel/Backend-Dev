const express = require("express");

const app = express();
app.use(express.json());

let authors = [
  { id: 1, name: "Ashutosh", age: 25 },
  { id: 2, name: "Rahul", age: 28 },
  { id: 3, name: "Aman", age: 30 }
];

let nextId = 4;

app.get("/authors", (req, res) => {
  res.json(authors);
});

app.get("/authors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const author = authors.find(a => a.id === id);
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.json(author);
});

app.post("/authors", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age)
    return res.status(400).json({ message: "Name and age are required" });

  const newAuthor = { id: nextId++, name, age };
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

app.put("/authors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;

  const author = authors.find(a => a.id === id);
  if (!author) return res.status(404).json({ message: "Author not found" });

  if (name) author.name = name;
  if (age) author.age = age;

  res.json(author);
});

app.delete("/authors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = authors.findIndex(a => a.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Author not found" });

  const deleted = authors.splice(index, 1);
  res.json({ message: "Author deleted", author: deleted[0] });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
