const getSystemInfo = require("./systemInfo");
const logData = require("./logger");

setInterval(() => {
    const info = getSystemInfo();
    logData(info);
}, 5000);
