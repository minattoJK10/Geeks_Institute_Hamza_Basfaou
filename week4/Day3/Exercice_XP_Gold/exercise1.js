// Function using destructuring directly in the parameters
function printFullName({ first, last }) {
  return `Your full name is ${first} ${last}`;
}

// Test the function
console.log(printFullName({ first: 'Elie', last: 'Schoppik' }));
// Output: Your full name is Elie Schoppik
