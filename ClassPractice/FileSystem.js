//const fs = require('fs');
//const promises = require('fs').promises;
// create file with sync
//fs.writeFileSync("./fileSystem.txt","hello ashutosh patel");

// create file with Async
//fs.writeFile("./fileSystem.txt","hi i am ashutosh patel",(err)=>{});

//Reading the file with sync function.
// const result = fs.readFileSync("./notes.txt","utf-8");
// console.log(result);

//Reading the file with async function.
// fs.readFile("./notes.txt","utf-8",(err,result)=>{
//     if(err){
//         console.error(err);

//     }
//     console.log(result);
// });

//appending the content in the file 
//fs.appendFileSync("./fileSystem.txt",new Date().getDate().toLocaleString());
//fs.appendFileSync("./fileSystem.txt",`${Date.now()} hay ashutosh patel`);

//coping the file
//fs.cpSync("./fileSystem","./file_System.txt");
//fs.unlinkSync("./file_System.txt");


//using statsync
//console.log(fs.statSync("./fileSystem.txt"));


//console.log(fs.statSync("./fileSystem.txt")).isFile();


//creating a directory.
// fs.mkdirSync("./New Folder/sub_folder1");
// fs.mkdirSync("./new Folder/sub_folder2");
// ["sub_folder1","sub_folder2"].forEach(f => fs.mkdirSync(`./New Folder/${f}`, { recursive: true }));

//removing the directory 
//fs.rmdirSync("./New Folder"); // if directory is empty
//fs.rmSync("./New Folder", { recursive: true, force: true });

//reading the directory
// fs.readdir("./",(err,fileSystem)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log(fileSystem);
// })
/*Output 
[
 'callback.js',    'fileSystem.js',
 'fileSystem.txt', 'hello.js',
 'hello1.js',      'index.html',
 'log.txt',        'node_modules',
 'notes.txt',      'package-lock.json',
 'package.json',   'path.js',
 'practice.js',    'promises.js',
 'script.js',      'server.js',
 'style.css',      'url.js'
] */


//Blocking operation and nonn-blocking operation.
// Blocking Operation
// console.log("1");
// const result= fs.readFileSync("./unknown.txt", "utf8");
// console.log(result);

// console.log("2");

// Non-Blocking Operation
// console.log("1");
// fs.readFile("./fileSystem.txt", "utf8", (err, result) => {
//   console.log(result);
// });
// console.log("2");

//common error 
// ENOENT - File or directory does not exist
// EACCES - Permission denied
// EEXIST - File already exists

// EISDIR - Expected file but found directory
// ENOTDIR - Expected directory but found file

//Error handling with call back
// const fs = require("fs");
// fs.readFile("./notes.txt", "utf-8", (err, data) => {
//   if (err) {
//     if (err.code == "ENOENT") {
//       console.log("file not found");
//     }
//     return;
//   }
//   console.log(data);
// });


//Error handling with async/await
// const fsPromises = require('fs').promises;
// async function readFileSafe() {
//   try {
//     const data = await fsPromises.readFile("./notes.txt", 'utf8');
//     console.log(data);
//   }
//   catch (err) {
//     console.log("Error",err.data);
//   }
// }

//StreamError handling
// const FileSystem =require("fs");
// const readStream = FileSystem.createReadStream("./fileSystem.txt");
// const writeStream = FileSystem.createWriteStream("./notes.txt");

// readStream.on("error",(err)=>{
//   console.log("read error:",err.message);
//   writeStream.destroy();

// });
// writeStream.on("error",(err)=>{
//   console.log("read error:",err.message);
//   readStream.destroy();

// });


const FileSystem = require("fs");

const readStream = FileSystem.createReadStream("./fileSystem.txt");
const writeStream = FileSystem.createWriteStream("./notes.txt");

readStream.on("error", (err) => {
  console.log("Read error:", err.message);
  writeStream.destroy();
});

writeStream.on("error", (err) => {
  console.log("Write error:", err.message);
  readStream.destroy();
});

readStream.pipe(writeStream);
