//Custom  middleware(LVR Rule):
//1.logger middleware: only the information get printed(which type of request is incoming)
// use case : debugging and monitoring.

//2.validation Middleware: Checking the correctness of the data.
//USe Case: form vlidation , api data check.

//3.Route-specific Middleware: Request allowed / blocked


/*const express = require('express');
const app = express();

const  mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/DataBase");
//Built in middleware
app.use(express.json());

//Logger Middleware
const loggerMiddleware = (req, res, next) => {
    console.log("Method",req.method);
    console.log("URL",req.url);
    next();
}

//Apply Globally
app.use(loggerMiddleware);

//Validation Middleware
const validateDataMiddleware = (req, res, next) => {
    const { name, email } = req.body;
    if(!name)
{
        return res.status(400).json({ message: "Name is required" });
}
next();
};

//Route specific middleware
const checkAdmin=(req, res, next) => {
    //dummy check for admin role
    const isAdmin=true;
    if(!isAdmin)
{
        return res.status(403).json({ message: "Access denied" });
}
next();
};

//Home route
app.get("/",(req, res) => {
    res.send("Welcome to home page");
});

//Validation middleware use
app.post("/user",validateDataMiddleware,(req, res) => {
    res.json({ message: "User created successfully", user: req.body });
});

//route specific middleware use
app.get("/admin",checkAdmin,(req, res) => {
    res.send( "Welcome admin" );
});

app.listen(3000, () => { 
    console.log("Server is running on port 3000");
});*/


//custom middleware with database connection and schema validation

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/DataBase")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Built-in middleware
app.use(express.json());

// Logger Middleware
const loggerMiddleware = (req, res, next) => {
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    next();
};
app.use(loggerMiddleware);

// Schema + Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String }
});

const User = mongoose.model("User", userSchema);

// Validation Middleware
const validateDataMiddleware = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    next();
};

// Route-specific middleware
const checkAdmin = (req, res, next) => {
    const isAdmin = true;
    if (!isAdmin) {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to home page");
});

//  CREATE + STORE DATA
app.post("/user", validateDataMiddleware, async (req, res) => {
    const user = await User.create(req.body);
    res.json({
        message: "User created successfully",
        user
    });
});

// Admin route
app.get("/admin", checkAdmin, (req, res) => {
    res.send("Welcome admin");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});