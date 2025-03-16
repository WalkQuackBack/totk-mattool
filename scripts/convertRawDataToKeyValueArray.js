// import materials from './public/materials.json'
import { readFile, writeFile } from "node:fs/promises";
import { json } from "node:stream/consumers";

const data = await readFile("../public/materials.json");
const materials = JSON.parse(data);

const keyValueArray = Object.entries(materials).map(([key, value]) => ({
  key,
  value,
}));

// console.log(keyValueArray);

await writeFile("../public/process.json", JSON.stringify(keyValueArray));
