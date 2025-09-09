// ------1------
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log("Output 1:", result);
// Expected Output: ["bread", "carrot", "potato", "chicken", "apple", "orange"]


// ------2------
const country = "USA";
console.log("Output 2:", [...country]);
// Expected Output: ["U", "S", "A"]


// ------Bonus------
let newArray = [...[,,]];
console.log("Bonus Output:", newArray);
// Expected Output: [undefined, undefined]
