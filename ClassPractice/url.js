const url = require("url");
const http = require("http");

const myServer = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    switch (myUrl.pathname) {
        case "/":
            res.end("This is home page");
            break;

        case "/about":
            const username = myUrl.query.myname;
            res.end(`hi, ${username}`);
            break;
            default:   
              res.end("404 page not found");
    }
});

myServer.listen(8000, () => console.log("server started"));