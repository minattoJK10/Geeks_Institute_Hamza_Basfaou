// app.js
import people from './data.js'; // ✅ Import the default export from data.js

// Function to calculate the average age
function calculateAverageAge(personArray) {
  const totalAge = personArray.reduce((sum, person) => sum + person.age, 0);
  return totalAge / personArray.length;
}

// Use the function with the imported data
const averageAge = calculateAverageAge(people);

console.log("List of people:", people);
console.log(`The average age is: ${averageAge.toFixed(2)}`);
