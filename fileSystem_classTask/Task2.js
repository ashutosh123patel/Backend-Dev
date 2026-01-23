const fs = require("fs");
const readline = require("readline");

const inputFile = "server.log";
const outputFile = "summary.txt";

let totalLines = 0;
let errorCount = 0;
let warningCount = 0;
let infoCount = 0;

const readStream = fs.createReadStream(inputFile);

const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

rl.on("line", (line) => {
  totalLines++;

  if (line.includes("ERROR")) errorCount++;
  else if (line.includes("WARNING")) warningCount++;
  else if (line.includes("INFO")) infoCount++;
});

rl.on("close", () => {
  const summary = `Log File Analysis Repor Total Lines   : ${totalLines} ERROR Count  : ${errorCount} WARNING Count: ${warningCount} INFO Count   : ${infoCount}`;

  fs.writeFileSync(outputFile, summary);
  console.log("Summary report generated");
});
