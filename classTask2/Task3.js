const http = require("http");
const fs = require("fs");
const url = require("url");

let students = [
    { id: 1, name: "Amit", branch: "CSE" },
    { id: 2, name: "Riya", branch: "IT" }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    let responseMessage = "";

    if (method === "GET" && path === "/students") {
        res.writeHead(200, { "Content-Type": "application/json" });
        responseMessage = JSON.stringify(students);
        res.end(responseMessage);
    }

    else if (method === "GET" && path.startsWith("/students/")) {
        const id = parseInt(path.split("/")[2]);
        const student = students.find(s => s.id === id);

        if (!student) {
            res.writeHead(404, { "Content-Type": "application/json" });
            responseMessage = JSON.stringify({ message: "Student Not Found" });
            res.end(responseMessage);
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            responseMessage = JSON.stringify(student);
            res.end(responseMessage);
        }
    }

    else if (method === "POST" && path === "/students") {
        let body = "";

        req.on("data", chunk => body += chunk);

        req.on("end", () => {
            const newStudent = JSON.parse(body);
            newStudent.id = students.length + 1;
            students.push(newStudent);

            res.writeHead(201, { "Content-Type": "application/json" });
            responseMessage = JSON.stringify(newStudent);
            res.end(responseMessage);
        });
        return;
    }

    else if (method === "DELETE" && path.startsWith("/students/")) {
        const id = parseInt(path.split("/")[2]);
        const lengthBefore = students.length;
        students = students.filter(s => s.id !== id);

        if (students.length === lengthBefore) {
            res.writeHead(404, { "Content-Type": "application/json" });
            responseMessage = JSON.stringify({ message: "Student Not Found" });
            res.end(responseMessage);
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            responseMessage = JSON.stringify({ message: "Student Deleted" });
            res.end(responseMessage);
        }
    }

    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        responseMessage = JSON.stringify({ message: "Route Not Found" });
        res.end(responseMessage);
    }

    const log = `${new Date().toISOString()} | ${method} | ${path} | ${responseMessage}\n`;
    fs.appendFile("log.txt", log, () => {});
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
