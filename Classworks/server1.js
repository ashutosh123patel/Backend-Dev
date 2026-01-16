// const http=require("http");
// //Plain text
// const  server=http.createServer((req,res)=>{
//     res.writeHead(200,{'content-type':'plain/text'});
//     res.end("hello world\n");
// })
// server.listen(8000, () => console.log('server is running'));


// const http = require('http'); 
// const server = http.createServer((req, res) => {
//     if(req.url === '/home'){
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end('<h1>Welcome to the Home Page</h1>');
//     } else if(req.url === '/about'){
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end('<h1>About Us</h1><p>This is the about page.</p>');
//     }else if(req.url === '/contact'){
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end('<h1>Contact</h1><p>ashutoshp141@gmail.com</p>');
//     }
//     else {
//         res.writeHead(404, {'Content-Type': 'text/html'});
//         res.end('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
//     }
// });
// server.listen(8000, () => {
//     console.log('Server running ');
// });

 

//JS Object
// let user ={
//     username:"ashutosh",
//     email:"ashutoshp141@gmail.com",
//     contact:"7081865179"
// }

//json object
// let json={
//     "username":"ashutosh",
//    " email":"ashutoshp141@gmail.com",
//     "contact":"7081865179"
// }
//JSON.stringify(user) js object -> json string
//JSON.parse( json string-> json)
// const  server=http.createServer((req,res)=>{
//      res.writeHead(200,{'content-type':'application/json'});
//      //res.end(user);
//      res.end(JSON.stringify());
//  })
// server.listen(8000, () => {
//     console.log('Server running ');
// });

const http = require('http');
let json = {
    "username": "krishpathak79",
    "age": 20,
    "email": "krishpathak79@gmail.com",
};
const server = http.createServer((req, res) => {
    if(req.url === '/home'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(json));
    }
    else if(req.url === '/user'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ username: json.username, age: json.age }));
    }
    else { 
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
    }
}); 
server.listen(3000, () => {
    console.log('Server running ');
}); 