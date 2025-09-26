// app.js
const { readFile, writeFile } = require("./fileManager");

async function runFileOperations() {
  try {
    const helloContent = await readFile("./Hello World.txt");
    console.log("Content of ./Hello World.txt:");
    console.log(helloContent);

    await writeFile("./Bye World.txt", "Writing to the file asynchronously");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

runFileOperations();
