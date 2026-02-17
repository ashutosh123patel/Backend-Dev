const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname);

app.use(express.static(__dirname));

app.get("/gallery", (req, res) => {
    const images = ["AbD.jpg", "AbdAndVirat.jpg"];
    res.render("gallery", { images });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

