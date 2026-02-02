/* Creating a basic server
const http = require('http');
const server = http.createServer((req,res)=>{
   res.writeHead(200,{'content-type':'plain/text'});
   res.end("hello world");
 });
 server.listen(8000,()=>{console.log("server is running at 8000")});

 */
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


/*const http = require("http");
const fs = require("fs");
  
const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}\n`;
    fs.appendFile("log.txt", log, ()   => {});
     //res.end("Hello from server");

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
myServer.listen(8000, () => console.log("server started"));*/

/*
const http = require("http");
const fs = require("fs");
  
const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}:${req.method} ${req.url}\n`
    console.log(log);
    try{
        fs.appendFileSync('log.txt',log,'utf8');
    }catch(e){
        console.error('Log write failed:',e.message);
    }
    console.log('Handling:',req.url);
    res.setHeader('Content-Type','text/plain');

    if(req.url=='/favicorn.ion'){
        res.statusCode=204;
        res.end();
        return;
    }
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
myServer.listen(8000, () => console.log("server started"));*/

//class task .

const http = require("http");
const fs = require("fs");
//const { timeStamp } = require("console");
  
const myServer = http.createServer((req, res) => {
    const timestamp = Date.now();
    res.setHeader('Content-Type','text/plain');
    
    if(req.url==='/favicorn.ion'){
        res.statusCode=204;
        res.end();
        return;
    }
   
    let pageMessage='';
    switch(req.url){
        case "/":
            pageMessage=("Home Page");
            break;
        case "/about":
            pageMessage= ("About page");
            break;  
        case "/contact":
            pageMessage=("Contact page");
            break;    
        default:
            res.statusCode=404;
            pageMessage=("404 page not find");
            //break;  
    }
    const responseLog = `${timestamp}: Response sent:  "${pageMessage}" for ${req.url}\n`;
    console.log(responseLog.trim());
    fs.appendFileSync('log.txt',responseLog, 'utf8');
    res.end(pageMessage);

});
myServer.listen(8000, () => console.log("server started"));

 

 