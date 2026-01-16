const express = require("express");

const app = express();
app.use(express.json());

let todos = [];
let id = 1;

app.post("/todos", (req, res) => {
    const todo = { id: id++, task: req.body.task };
    todos.push(todo);
    res.json(todo);
});

app.get("/todos", (req, res) => {
    res.json(todos);
});

app.put("/todos/:id", (req, res) => {
    const todo = todos.find(t => t.id == req.params.id);
    if (!todo) return res.status(404).json({ message: "Not Found" });
    todo.task = req.body.task;
    res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
    todos = todos.filter(t => t.id != req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("Server running"));
