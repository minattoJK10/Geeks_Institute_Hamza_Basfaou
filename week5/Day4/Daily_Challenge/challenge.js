// challenge.js
import { greet } from './greeting.js';
import { displayColorfulMessage } from './colorful-message.js';
import { readFileContent } from './read-file.js';

console.log('=== 🌟 Daily Challenge ===\n');

// 1. Greeting
const message = greet('Hamza');
console.log(message);

// 2. Colorful Message
console.log('\n=== 🎨 Colorful Message ===');
displayColorfulMessage();

// 3. File Reading
console.log('\n=== 📂 File Content ===');
readFileContent();
