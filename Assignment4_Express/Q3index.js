const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname);

app.use(express.urlencoded({ extended: true }));

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    res.send("Form submitted successfully!");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
