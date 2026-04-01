/*const express = require("express");
const mongoose = require("mongoose");

const app = express();

//  yaha hum connect kur rahay hai  DB
mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

app.use(express.json());

// yah raha schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },
    dueDate: {
        type: Date
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);



//  we are here creating the task
app.post("/api/tasks", async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// geting  all the task on the basis of  (filter + sort)
app.get("/api/tasks", async (req, res) => {
    try {
        const { status, sort } = req.query;

        let filter = {};
        if (status) filter.status = status;

        let query = Task.find(filter);

        if (sort === "dueDate") {
            query = query.sort({ dueDate: 1 });
        }

        const tasks = await query;
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// here we are getting the task on the basis of id.
app.get("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ msg: "Task not found" });

        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ msg: "Invalid ID" });
    }
});


//  we are here updating the task
app.put("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) return res.status(404).json({ msg: "Task not found" });

        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// here we are deleting the task on the basis of id.
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) return res.status(404).json({ msg: "Task not found" });

        res.status(200).json({ msg: "Task deleted" });
    } catch (err) {
        res.status(400).json({ msg: "Invalid ID" });
    }
});


app.listen(8000, () => console.log("Server started on port 8000"));*/



const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.use(express.json());

// simple schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: String,
  status: String,
  dueDate: Date
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

// CREATE
app.post("/api/tasks", async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// READ ALL (with optional filter + sort)
app.get("/api/tasks", async (req, res) => {
  const { status, sort } = req.query;

  let filter = {};
  if (status) filter.status = status;

  let query = Task.find(filter);

  if (sort === "dueDate") {
    query = query.sort({ dueDate: 1 });
  }

  const tasks = await query;
  res.json(tasks);
});

// READ ONE
app.get("/api/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

// UPDATE
app.patch("/api/tasks/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedTask);
});

// DELETE
app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

app.listen(8000, () => console.log("Server started on port 8000")); 
