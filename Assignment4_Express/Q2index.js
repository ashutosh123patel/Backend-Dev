const express = require("express");
const app = express();

app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const end = Date.now();
        const responseTime = end - start;
        console.log(`${req.method} ${req.originalUrl} - ${responseTime} ms`);
    });

    next();
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(4000, () => {
    console.log("Server running ");
});
