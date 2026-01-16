const os = require("os");
const fs = require("fs");

setInterval(() => {
    const info = `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU: ${os.cpus()[0].model}
Total Memory: ${os.totalmem()}
Free Memory: ${os.freemem()}
-------------------------
`;

    fs.appendFile("exerc3Output.txt", info, () => {});
}, 5000);
