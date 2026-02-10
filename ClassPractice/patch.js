const express = require("express");
const app = express();
app.use(express.json());

let students = [
    { id: 1, name: "Ashutosh", marks: 90, city: "Gorakhpur", status: "Inactive" },
    { id: 2, name: "Neha", marks: 70, city: "Gorakhpur", status: "Active" },
    { id: 3, name: "Abhishek", marks: 66, city: "Gorakhpur", status: "Active" },
    { id: 4, name: "Anand", marks: 89, city: "Gorakhpur", status: "Active" },
]


// View all students
app.get("/students", (req, res) => {
    res.json(students);
});

// Check active status
app.get("/students/:id/status", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json({
        id: student.id,
        name: student.name,
        status: student.status,
        active: student.status === "Active"
    });
});

//Converting the active user into the inactive user and vice-versa.
app.patch("/students/:id/toggle-status", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    student.status = student.status === "Active" ? "Inactive" : "Active";

    res.json({
        message: "Student status updated",
        id: student.id,
        name: student.name,
        status: student.status
    });
});


// Patch request: update fields
app.patch("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const update = req.body;

    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    Object.assign(student, update);
    res.json({ message: "Student info updated", student });
});

app.listen(8001, () => {
    console.log("server is working");
});


