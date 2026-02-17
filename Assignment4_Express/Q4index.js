const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname);

app.use(express.urlencoded({ extended: true }));

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", (req, res) => {
    res.send("Form submitted");
});

app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

