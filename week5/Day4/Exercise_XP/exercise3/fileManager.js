// fileManager.js
const fs = require("fs").promises;

// Asynchronous readFile
async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data; // return file content
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
  }
}

// Asynchronous writeFile
async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, "utf8");
    console.log(`Successfully wrote to ${filePath}`);
  } catch (err) {
    console.error(`Error writing file: ${err.message}`);
  }
}

module.exports = { readFile, writeFile };
