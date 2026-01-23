const fs = require("fs");

const args = process.argv.slice(2);
const command = args[0];

if (command === "read") {
  console.log(fs.readFileSync(args[1], "utf-8"));
}

if (command === "write") {
  fs.writeFileSync(args[1], args[2]);
  console.log("File written");
}

if (command === "copy") {
  fs.copyFileSync(args[1], args[2]);
  console.log("File copied");
}

if (command === "delete") {
  fs.unlinkSync(args[1]);
  console.log("File deleted");
}

if (command === "list") {
  const files = fs.readdirSync(args[1] || ".");
  files.forEach(f => console.log(f));
}
