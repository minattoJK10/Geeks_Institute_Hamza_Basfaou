// Transform the winBattle function into an arrow function
const winBattle = () => true;

// Create a variable called experiencePoints
// Use a ternary operator to assign value based on winBattle()'s return value
let experiencePoints = winBattle() ? 10 : 1;

// Output the result
console.log(experiencePoints);

// Expected output: 10