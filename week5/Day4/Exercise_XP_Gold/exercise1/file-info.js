// file-info.js
import fs from 'fs';
import path from 'path';

// Function to display file information
export function getFileInfo() {
  // Create a full path to example.txt using path.join
  const filePath = path.join(process.cwd(), 'data', 'example.txt');

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    console.log('✅ File exists!');

    // Get file stats
    const stats = fs.statSync(filePath);

    console.log(`📂 File Path: ${filePath}`);
    console.log(`📏 File Size: ${stats.size} bytes`);
    console.log(`🕒 Created On: ${stats.birthtime}`);
  } else {
    console.log('❌ File does NOT exist!');
  }
}
