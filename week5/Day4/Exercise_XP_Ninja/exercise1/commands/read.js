// commands/read.js
import fs from 'fs';

export function readFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log('📂 File Content:\n', content);
  } catch (error) {
    console.error('❌ Error reading file:', error.message);
  }
}
