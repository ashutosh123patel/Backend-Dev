const express = require("express");
const app = express();

app.use(express.json());

let users = [
    { id: 1, name: "Ashutosh", email: "ashu@gmail.com", role: "Admin" },
    { id: 2, name: "Neha", email: "neha@gmail.com", role: "User" }
];

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logger);

const validateUser = (req, res, next) => {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    next();
};

app.get("/users", (req, res) => {
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

app.post("/users", validateUser, (req, res) => {
    const { name, email, role } = req.body;

    const newUser = {
        id: users.length + 1,
        name,
        email,
        role
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const { name, email, role } = req.body;

    if (!name && !email && !role) {
        return res.status(400).json({ message: "At least one field required to update" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    res.json(user);
});

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);
    res.json({ message: "User deleted successfully" });
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
