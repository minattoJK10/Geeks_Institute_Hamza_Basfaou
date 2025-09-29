// app.js
import promptSync from 'prompt-sync';
import { addFakeUser, listUsers } from './users.js';

const prompt = promptSync();

// Add 3 fake users
for (let i = 0; i < 3; i++) {
  addFakeUser();
}

// Ask the user for their own info
console.log("\n📝 Add your own user:");
const name = prompt("Enter your name: ");
const street = prompt("Enter your street address: ");
const country = prompt("Enter your country: ");

// Manually add the user
listUsers().push({ name, street, country });

console.log("\n📋 All Users (Including Yours):");
console.table(listUsers());
