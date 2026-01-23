/*Create a Node.js program that supports the following commands:
Read a file
Write content to a file
Append logs to a file
Copy a file
Delete a file
List files inside a directory */



const fs = require("fs");

// Reading a file
fs.readFile("task1input.txt", "utf8", (err, data) => {
  if (err) return console.error("Read error:", err);
  console.log("File content:", data);
});

// Write to a file
const content = "Hi, I am Ashutosh Patel from Gorakhpur and I am a B.Tech student.\n";
fs.writeFile("task1output.txt", content, (err) => {
  if (err) return console.error("Write error:", err);
  console.log("File written successfully");
});

// Appending the  logs to a file
fs.appendFile("task1output.txt", "this is the new line in mine information section\n", (err) => {
  if (err) return console.error("Append error:", err);
  console.log("Log appended");
});

//  Copy  of a file
fs.copyFile("task1output.txt", "task1copy.txt", (err) => {
  if (err) return console.error("Copy error:", err);
  console.log("File copied successfully");
});

//  Deletin  a file
fs.unlink("task1copy.txt", (err) => {
  if (err) return console.error("Delete error:", err);
  console.log("File deleted successfully");
});

// Listing the  files inside a directory
fs.readdir(".", (err, files) => {
  if (err) return console.error("Directory read error:", err);
  console.log("Files in directory:", files);
});
