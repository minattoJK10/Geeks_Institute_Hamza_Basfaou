//  Exercise 6 : Challenges

// -------------------------------
// PART 1: Evaluate Expressions
// -------------------------------
console.log("// PART 1: Evaluate Expressions");

console.log([2] === [2]); 
// false -> Arrays are reference types; each [2] is stored in a different memory location.

console.log({} === {});
// false -> Objects are reference types; each {} is a new object in memory.


// -------------------------------
// PART 2: Object Reference Behavior
// -------------------------------
console.log("\n// PART 2: Object Reference Behavior");

const object1 = { number: 5 };
const object2 = object1;  // object2 shares the same reference as object1
const object3 = object2;  // object3 also shares the same reference
const object4 = { number: 5 }; // different reference, even though value is same

// Update the value of number in object1
object1.number = 4;

console.log(object2.number); // 4 -> same reference as object1
console.log(object3.number); // 4 -> same reference as object1
console.log(object4.number); // 5 -> independent object


// -------------------------------
// PART 3: Classes and Inheritance
// -------------------------------
console.log("\n// PART 3: Classes and Inheritance");

// Parent class: Animal
class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

// Child class: Mammal extends Animal
class Mammal extends Animal {
  // Method that describes the animal's sound and details
  sound(animalSound) {
    return `${animalSound} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}

// Create an instance of Mammal
const farmerCow = new Mammal('Lily', 'cow', 'brown and white');

// Call the sound method
console.log(farmerCow.sound('Moooo'));
// Output: Moooo I'm a cow, named Lily and I'm brown and white
