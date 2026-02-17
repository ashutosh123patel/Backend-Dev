const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: true }));

let students = [
    { id: 1, name: "Ashutosh", marks: 85, grade: "A" },
    { id: 2, name: "Neha", marks: 45, grade: "C" },
    { id: 3, name: "Rahul", marks: 30, grade: "F" }
];

app.get("/students", (req, res) => {
    res.render("students", { students });
});

app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.send("Student not found");
    }

    res.render("student", { student });
});

app.get("/add-student", (req, res) => {
    res.render("add-student");
});

app.post("/add-student", (req, res) => {
    const { name, marks } = req.body;

    let grade = "F";
    if (marks >= 75) grade = "A";
    else if (marks >= 50) grade = "B";
    else if (marks >= 35) grade = "C";

    const newStudent = {
        id: students.length + 1,
        name,
        marks: parseInt(marks),
        grade
    };

    students.push(newStudent);
    res.redirect("/students");
});

app.listen(3000, () => {
    console.log("Student portal running on port 3000");
});
