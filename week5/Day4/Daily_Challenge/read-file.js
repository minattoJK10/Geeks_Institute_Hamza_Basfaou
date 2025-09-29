// read-file.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// This is required because ES modules don't have __dirname by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readFileContent() {
  const filePath = path.join(__dirname, 'files', 'file-data.txt');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    console.log('📄 File Content:\n', data);
  } catch (error) {
    console.error('❌ Error reading file:', error.message);
  }
}
