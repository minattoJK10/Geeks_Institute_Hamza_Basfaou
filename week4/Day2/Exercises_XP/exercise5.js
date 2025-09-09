const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

// Use reduce() to combine all elements into a single string
const singleString = epic.reduce((accumulator, currentValue) => accumulator + " " + currentValue);

console.log(singleString);
