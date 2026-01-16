const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    if (req.method === "GET") {
        switch (path) {
            case "/":
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Welcome to the Node.js HTTP Server");
                break;

            case "/about":
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end("<h1>About Page</h1><p>This is a simple Node.js server</p>");
                break;

            case "/user":
                const name = parsedUrl.query.name;
                const age = parsedUrl.query.age;

                const user = {
                    name: name,
                    age: age
                };

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(user));
                break;

            default:
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 Page Not Found");
        }
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
