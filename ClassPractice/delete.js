// const express = require("express");
// const app = express();
// app.use(express.json());

// let students = [
//     { id: 1, name: "Ashutosh", marks: 90, city: "Gorakhpur" },
//     { id: 2, name: "Neha", marks: 70, city: "Gorakhpur" },
//     { id: 3, name: "Abhishek", marks: 66, city: "Gorakhpur" },
//     { id: 4, name: "Anand", marks: 89, city: "Gorakhpur" },
// ]
//  //View students
//     app.get("/students", (req, res) => {
//     res.json(students);
// });

// //Delete-Remove the student by id.
// app.delete("/Students/:id",(req,res)=>{
//     const id = req.params.id;
//     const index=students.findIndex((s)=>s.id==id);
//     if(index==-1){
//         return res.status(404).json({ message: "Student not found" });
//     }
//     const deleteStudent=students.splice(index,1);
//     res.json({message:"student data deleted successfully",deleteStudent:deleteStudent[0]});
// });

// app.listen(2000, () => {
//     console.log("server is working");
// });

const express = require("express");
const app = express();
app.use(express.json());

let students = [
    { id: 1, name: "Ashutosh", marks: 90, city: "Gorakhpur" },
    { id: 2, name: "Neha", marks: 70, city: "Gorakhpur" },
    { id: 3, name: "Abhishek", marks: 66, city: "Gorakhpur" },
    { id: 4, name: "Anand", marks: 89, city: "Gorakhpur" }
];

app.get("/students", (req, res) => {
    res.json(students);
});

app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    if (students[index].marks > 70) {return res.status(400).json(
        { message: "His/her marks are above 70 so we cant delete it." });
    }

    const deletedStudent = students.splice(index, 1);
    res.json({
        message: "Student data deleted successfully",
        deletedStudent: deletedStudent[0]
    });
});

app.listen(2000, () => {
    console.log("server is working");
});




//delete the marks of the students whose marks are below 70 or =70 and it is above message that it is above the 70, by using Students/:id
// const express = require("express");
// const app = express();
// app.use(express.json());

// let students = [
//     { id: 1, name: "Ashutosh", marks: 90, city: "Gorakhpur" },
//     { id: 2, name: "Neha", marks: 70, city: "Gorakhpur" },
//     { id: 3, name: "Abhishek", marks: 66, city: "Gorakhpur" },
//     { id: 4, name: "Anand", marks: 89, city: "Gorakhpur" },
// ]
//  //View students
//     app.get("/students", (req, res) => {
//     res.json(students);
// });

// //Delete-Remove the student by id.
// app.delete("/Students/:id",(req,res)=>{
//     const marks = req.params.marks;
//     const index=students.findIndex((s)=>s.marks==marks);
//     if(index<=70){
//         return res.status(404).json({ message: "His/her marks is above the 70" });
//     }
//     const deleteStudent=students.splice(index,1);
//     res.json({message:"student data deleted successfully",deleteStudent:deleteStudent[0]});
// });

// app.listen(2000, () => {
//     console.log("server is working");
// });


