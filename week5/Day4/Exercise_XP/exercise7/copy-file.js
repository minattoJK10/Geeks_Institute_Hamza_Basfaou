// copy-file.js
const fs = require('fs');

// Read the content of source.txt
fs.readFile('./source.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading source.txt:', err);
    return;
  }

  console.log('Content of source.txt:', data);

  // Write the same content to destination.txt
  fs.writeFile('./destination.txt', data, (err) => {
    if (err) {
      console.error('Error writing to destination.txt:', err);
      return;
    }
    console.log('Successfully copied content to destination.txt!');
  });
});
