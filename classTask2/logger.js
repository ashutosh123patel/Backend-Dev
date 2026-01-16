const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "system-log.txt");

function logData(data) {
    const log = `${data.time} | CPU: ${data.cpuCount} | FreeMem: ${data.freeMemory} | TotalMem: ${data.totalMemory} | Platform: ${data.platform}\n`;
    fs.appendFile(logPath, log, () => {});
}

module.exports = logData;
