const os = require("os");

function getSystemInfo() {
    return {
        cpuCount: os.cpus().length,
        freeMemory: os.freemem(),
        totalMemory: os.totalmem(),
        platform: os.platform(),
        time: new Date().toISOString()
    };
}

module.exports = getSystemInfo;
