import fs from "fs";

export function createFolderIfNotExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Folder created at ${folderPath}`);
  } else {
    console.log(`Folder already exists at ${folderPath}`);
  }
}
