// const express = require("express");
// const app = express();
// app.use(express.json());

// const users = [];

// app.get("/", (req, res) => {
//     res.send("Auth Server Running");
// });


// app.post("/register", (req, res) => {
//     const { userId, email, password } = req.body;

//     const emailRegex = /@/;

//     if (!emailRegex.test(email)) {
//         return res.status(400).send("Email must contain @");
//     }


//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

//     if (!passwordRegex.test(password)) {
//         return res.status(400).send(
//             "Password must contain uppercase, lowercase, digit and be at least 6 characters long"
//         );
//     }

//     const exists = users.find(
//         user => user.email === email || user.userId === userId
//     );

//     if (exists) {
//         return res.status(400).send("User already exists");
//     }

//     users.push({ userId, email, password });
//     res.status(201).send("User registered successfully");
// });


// app.post("/login", (req, res) => {
//     const { email, password } = req.body;

//     const user = users.find(
//         u => u.email === email && u.password === password
//     );

//     if (!user) {
//         return res.status(401).send("Invalid email or password");
//     }

//     res.send("Login successful");
// });


// app.get("/users", (req, res) => {
//     res.send(users);
// });

// app.listen(8000, () => {
//     console.log("server is working");
// });
