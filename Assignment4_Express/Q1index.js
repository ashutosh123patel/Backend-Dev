const express = require("express");
const app = express();

const users = [
    { id: 1, name: "Ashutosh", age: 22 },
    { id: 2, name: "Neha", age: 21 },
    { id: 3, name: "Rahul", age: 23 },
    { id: 4, name: "Ashu", age: 20 }
];

app.get("/users", (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.json(users);
    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase())
    );

    res.json(filteredUsers);
});

app.listen(2000, () => {
    console.log("Our Server is running");
});
