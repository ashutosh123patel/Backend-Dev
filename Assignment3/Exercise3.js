const fs = require("fs").promises;
const path = require("path");

const sourceDir = "sourceDir";
const targetDir = "targetDir";

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function syncDirectories(src, dest) {
  try {
    const files = await fs.readdir(src);

    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);

      const srcStat = await fs.stat(srcPath);

      if (srcStat.isDirectory()) {
        await ensureDir(destPath);
        await syncDirectories(srcPath, destPath);
      } else {
        let copy = false;

        try {
          const destStat = await fs.stat(destPath);
          if (srcStat.mtimeMs > destStat.mtimeMs) copy = true;
        } catch {
          copy = true;
        }

        if (copy) {
          await fs.copyFile(srcPath, destPath);
          console.log(`Synced: ${file}`);
        }
      }
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
}

async function startSync() {
  await ensureDir(sourceDir);
  await ensureDir(targetDir);
  await syncDirectories(sourceDir, targetDir);
}

startSync();
