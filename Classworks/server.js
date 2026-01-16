/*const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
    //console.log("New Req Rec");
    //console.log("Req.headers");
    //console.log(req)
    const log = `${Date.now()}\n`;
    fs.appendFile("log.txt", log, () => {});
    res.end("Hello from server");
});

// myServer.listen(8000, () => console.log("server started"));
// myServer.listen(3000, () => console.log("server started"));
myServer.listen(8000, () => console.log("server started"));*/

//package lock.json


const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}\n`;
    fs.appendFile("log.txt", log, () => {});
   // res.end("Hello from server");

    //switch case 
    switch(req.url){
        case "/":
            res.end("Home Page");
            break;
        case "/about":
            res.end("About page");
            break;  
        case "/contact":
            res.end("Contact page");
            break;    
        default:
            res.end("404 page not find");
            break;  
    }
});
myServer.listen(8000, () => console.log("server started"));

