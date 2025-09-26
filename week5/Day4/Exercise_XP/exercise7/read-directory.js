// read-directory.js
const fs = require('fs');

// Specify the directory to read
const directoryPath = './';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  console.log('Files in the directory:');
  files.forEach(file => {
    console.log(file);
  });
});
