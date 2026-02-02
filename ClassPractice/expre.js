// const url = require('url');
// const http = require("http");
// const fs = require('fs');

// const myServer = http.createServer((req, res) => {
//     if (req.url === '/favicon.ico') {
//         res.statusCode = 204;
//         res.end();
//         return;
//     }
//     const myUrl = url.parse(req.url, true);
//     const log = `${Date.now()} : ${req.method} : ${req.url} New Req Received\n`;

//     fs.appendFile('server_logs.txt', log, (err) => {
//         switch (myUrl.pathname) {
//             case "/":
//                 if (req.method === 'GET') {
//                     res.end("This is Home Page");
//                 }
//                 break;
//             case "/about":
//                 const username = myUrl.query.myname;
//                 res.end("About Page. Hello " + username);
//                 break;

//             case "/search":
//                 const searchTerm = myUrl.query.search_query;
//                 res.end("Here are your Search Results for: " + search);
//                 break;
//             case "/signup":
//                 if (req.method === 'GET') {
//                     res.end("This is signup Page");
//                 }
//                 else if (req.method === 'POST') {
//                     res.end("Successfully singnup completed");
//                 }
//                 break;
//             case "/studentProfile":
//                 if (req.method === 'PUT') {
//                     res.end("This is mine new data");
//                 }
//                 else if (req.method === 'PATCH') {
//                     res.end("new roll no added");
//                 }
//                 else if (req.method === 'DELETE') {
//                     res.end("personal data get deleted");
//                 }
//                 break;

//             default:
//                 res.statusCode = 404;
//                 res.end("404 Page Not Found");
//         }
//     });
// });
// myServer.listen(8000, () => {
//     console.log("Server started");
// });





// const url = require('url');
// const http = require("http");
// const fs = require('fs');

// const myServer = http.createServer((req, res) => {
//     if (req.url === '/favicon.ico') {
//         res.statusCode = 204;
//         res.end();
//         return;
//     }
//     const myUrl = url.parse(req.url, true);
//     const log = `${Date.now()} : ${req.method} : ${req.url} New Req Received\n`;

//     fs.appendFile('server_logs.txt', log, (err) => {
//         switch (myUrl.pathname) {
//             case "/":
//                 if (req.method === 'GET') {
//                     res.end("This is Home Page");
//                 }
//                 break;
//             case "/about":
//                 const username = myUrl.query.myname;
//                 res.end("About Page. Hello " + username);
//                 break;

//             case "/search":
//                 const searchTerm = myUrl.query.search_query;
//                 res.end("Here are your Search Results for: " + search);
//                 break;
//             case "/signup":
//                 if (req.method === 'GET') {
//                     res.end("This is signup Page");
//                 }
//                 else if (req.method === 'POST') {
//                     res.end("Successfully singnup completed");
//                 }
//                 break;
//             case "/studentProfile":
//                 if (req.method === 'PUT') {
//                     res.end("This is mine new data");
//                 }
//                 else if (req.method === 'PATCH') {
//                     res.end("new roll no added");
//                 }
//                 else if (req.method === 'DELETE') {
//                     res.end("personal data get deleted");
//                 }
//                 break;

//             default:
//                 res.statusCode = 404;
//                 res.end("404 Page Not Found");
//         }
//     });
// });
// myServer.listen(8000, () => {
//     console.log("Server started");
// });


// const http = require("http");
// const fs = require("fs");
// const url = require("url");
// const myServer = http.createServer((req, res) => {
//   if (req.url === "/favicon.ico") return res.end();
//   const log = `${Date.now()}: ${req.method}  ${req.url} New Req Received\n`;
//   const myUrl = url.parse(req.url, true);
//   fs.appendFile("log.txt", log, (err, data) => {
//     switch (myUrl.pathname) {
//       case "/":
//         if (req.method === "GET") res.end("Home Page");
//         break;
//       case "/about":
//         const username = myUrl.query.myname;
//         res.end(`Hi, ${username}`);
//         break;
//       case "/search":
//         const search = myUrl.query.search_query;
//         res.end("Here are your results for " + search);
//         break;
//       case "/signup":
//         if (req.method === "GET") res.end("This is a signup form");
//         else if (req.method === "POST") {
//           res.end("Success");
//         }
//         break;
//       default:
//         res.end("404 Not Found");
//     }
//   });
// });
// myServer.listen(8000, () => console.log("Server Started"));


// const http = require("http");
// const express=require("express");

// const app = express();
// app.get("/",(req,res)=>{
//     return res.send("Home Page");
// })

// app.get("/about",(req,res)=>{
//     return res.send("About Home");
// })

// const myServer = http.createServer(app);
// myServer.listen(8000,()=>{
//     console.log("server is running");
// })

// const express=require("express");

// const app = express();
// app.get("/",(req,res)=>{
//     return res.send("Home Page");
// })

// app.get("/about",(req,res)=>{ 
//       return res.send("About this page, Hai"+req.query.myname+" your age is "+req.query.age);
// })

// app.listen(8000,()=>{
//     console.log("server is running");
// })

//small backend service for college attendence system using query parameter the student whi is present in the class shows present for them and if some one is not present then show no.
// const express = require("express");

// const app = express();
// app.get("/", (req, res) => {
//     return res.send("Home Page");
// })
// app.get("/attendance", (req, res) => {

//     const name = req.query.name;
//     const present = req.query.present;

//     if (present === "true") {
//         return res.send(name + " is Present");
//     } else {
//         return res.send(name + " is Absent");
//     }
// });

// app.listen(8000, () => {
//     console.log("Server is running ");
// });


const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.send("Home Page");
});

app.get("/attendance", (req, res) => {
    const name = req.query.name;
    const present = req.query.present;

    if (present === "true") {
        return res.send(name + " is Present");
    } 
    if (present === "false") {
        return res.send(name + " is Absent");
    }

    return res.send("Invalid attendance value");
});

app.listen(8000, () => {
    console.log("Server is running ");
});
