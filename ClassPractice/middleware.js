//This is application level Middleware
// const express = require('express');
// const app = express();

// app.use((req, res, next) => {
// console.log("Request url:",req.url);
// console.log("request Method:",req.method);
// next() // next middlewarw can access the route.
// });

// app.get('/home', (req, res) => {
// res.send('This is home page:');
// });

// app.listen(2000, () => {
//     console.log("server is working");
// });



//This is  build in  middleware 
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Application level middleware
app.use((req, res, next) => {
    console.log("Request url:", req.url);
    console.log("request Method:", req.method);
    next() // next middlewarw can access the route.
});

app.get('/home', (req, res) => {
    res.send('This is home page:');
});


//Route-level middleware
const checkLogin = (req, res, next) => {
    const isLoggedIn = true;
    if (!isLoggedIn) { return res.status(401).send("Please login first"); }
    next();
};

app.get('/dashboard', (req, res) => {
    res.send('welcome to dashboard:');
});




// Authentication middlware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Token required" });
    }

    if (token !== "mytoken") {
        return res.status(403).json({ message: "Invalid token" });
    }

    next();
};

app.get('/profile', authMiddleware, (req, res) => {
    res.send({ message: "profile data" });
});


// error handling middleware
app.get("/error", (req, res) => {
    throw new Error("Something went wrong");
});

app.use((err, req, res, next) => {
    console.log("Error middleware:", err.message);
    res.status(500).json({ message: "internal server error" });
});

app.listen(2000, () => {
    console.log("server is working");
});




  




