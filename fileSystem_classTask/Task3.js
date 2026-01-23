const fs = require("fs").promises;
const path = require("path");

const sourceDir = "uploads";
const backupDir = "backup";
const logFile = "backup.log";
const maxAge = 7 * 24 * 60 * 60 * 1000;

async function createDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writeLog(msg) {
  const time = new Date().toISOString();
  await fs.appendFile(logFile, `[${time}] ${msg}\n`);
}

async function backupAndClean() {
  await createDir(sourceDir);
  await createDir(backupDir);

  const files = await fs.readdir(sourceDir);
  const now = Date.now();

  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const stats = await fs.stat(filePath);

    if (!stats.isFile()) continue;

    const backupName = `${Date.now()}_${file}`;
    await fs.copyFile(filePath, path.join(backupDir, backupName));
    await writeLog(`BACKUP ${file}`);

    if (now - stats.mtimeMs > maxAge) {
      await fs.unlink(filePath);
      await writeLog(`DELETE ${file}`);
    }
  }
}

backupAndClean();
