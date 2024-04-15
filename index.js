import { inst } from "./inst.js";
import fs from "fs";
import { downloadImage } from "./downloadImage.js";
import { createFolderIfNotExists } from "./folder.js";

createFolderIfNotExists("./images");

const input = JSON.parse(await fs.promises.readFile("./input.json"));

const result = [];
for (let i = 0; i < input.length; i++) {
  const id = input[i];
  console.log(`${i}. ${id}`);
  try {
    const data = await inst(id);
    await downloadImage(data.image, `./images/${id}.jpg`);
    result.push(data);
  } catch {
    console.error(`Something went wrong with id: ${id}`);
  }
}

const jsonData = JSON.stringify(result);
const filePath = `./output_${new Date().getTime()}.json`;
await fs.promises.writeFile(filePath, jsonData);
console.log("JSON data has been written to", filePath);
