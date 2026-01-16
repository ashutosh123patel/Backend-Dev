const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    let message = "";

    switch (req.url) {
        case "/":
            message = "This is Home Page";
            break;
        case "/about":
            message = "This is About Page";
            break;
        case "/contact":
            message = "This is Contact Page";
            break;
        default:
            message = "404 Page Not Found";
            break;
    }

    const log = `${new Date().toISOString()} | ${req.url} | ${message}\n`;

    fs.appendFile("log.txt", log, () => {});

    res.end(message);
});

server.listen(8000, () => console.log("Server started on port 8000"));
