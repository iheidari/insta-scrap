import { inst } from "./inst.js";
import fs from "fs";
import { downloadImage } from "./downloadImage.js";
import { createFolderIfNotExists } from "./folder.js";

createFolderIfNotExists("./images");

const input = JSON.parse(fs.readFileSync("./input.json"));

const result = [];

for (const id of input) {
  const data = await inst(id);
  await downloadImage(data.image, `./images/${id}.jpg`);
  result.push(data);
}

const jsonData = JSON.stringify(result);
const filePath = "./output.json";
fs.writeFile(filePath, jsonData, (err) => {
  if (err) {
    console.error("Error writing JSON to file:", err);
    return;
  }
  console.log("JSON data has been written to", filePath);
});
