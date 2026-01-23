const fs = require("fs");
const readline = require("readline");

const inputFile = "server.log";
const outputFile = "summary.txt";

let totalLines = 0;
let errorCount = 0;
let warningCount = 0;
let infoCount = 0;

const stream = fs.createReadStream(inputFile);

const rl = readline.createInterface({
  input: stream,
  crlfDelay: Infinity
});

rl.on("line", line => {
  totalLines++;

  if (line.includes("ERROR")) errorCount++;
  else if (line.includes("WARNING")) warningCount++;
  else if (line.includes("INFO")) infoCount++;
});

rl.on("close", () => {
  const report = `
Log File Summary
Total Lines   : ${totalLines}
ERROR Count   : ${errorCount}
WARNING Count : ${warningCount}
INFO Count    : ${infoCount}
`;

  fs.writeFileSync(outputFile, report);
  console.log("Summary report generated");
});
