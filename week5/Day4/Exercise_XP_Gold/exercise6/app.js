// app.js
import promptSync from 'prompt-sync';

const prompt = promptSync();

/**
 * Function to validate full name
 * Rules:
 * 1. Only letters allowed
 * 2. Exactly one space between first and last name
 * 3. First letter of each name must be uppercase followed by lowercase
 */
function validateFullName(name) {
  // Regular Expression
  const regex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

  return regex.test(name);
}

// Ask the user for input
const fullName = prompt("Please enter your full name (e.g., John Doe): ");

// Validate and display result
if (validateFullName(fullName)) {
  console.log("✅ Valid name format!");
} else {
  console.log("❌ Invalid name format. Please use 'Firstname Lastname' with proper capitalization.");
}
