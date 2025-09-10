const letters = ['x', 'y', 'z', 'z'];

//1- for loop solution
const count = {};

for (let letter of letters) {
  count[letter] = (count[letter] || 0) + 1;
}

console.log(count); // Output: { x: 1, y: 1, z: 2 }

// 2- reduce() solution 
const countReduce = letters.reduce((acc, letter) => {
  acc[letter] = (acc[letter] || 0) + 1;
  return acc;
}, {});

console.log(countReduce); // Output: { x: 1, y: 1, z: 2 }
