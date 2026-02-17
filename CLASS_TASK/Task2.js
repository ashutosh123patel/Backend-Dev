const express = require("express");
const app = express();

app.use(express.json());

const users = [
    { id: 1, email: "admin@gmail.com", password: "1234", role: "Admin" },
    { id: 2, email: "user@gmail.com", password: "abcd", role: "User" }
];

let validTokens = [];

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = "token-" + Math.random().toString(36).substring(2);
    validTokens.push(token);

    res.json({ message: "Login successful", token });
});

const authenticate = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized - Token missing" });
    }

    if (!validTokens.includes(token)) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    next();
};

app.get("/dashboard", authenticate, (req, res) => {
    res.json({ message: "Welcome to Dashboard" });
});

app.get("/profile", authenticate, (req, res) => {
    res.json({ message: "Welcome to Profile Page" });
});

app.listen(3000, () => {
    console.log("Auth server running on port 3000");
});
