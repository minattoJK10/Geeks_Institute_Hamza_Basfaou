// Define a class named Person
class Person {
  constructor(name) {
    // The constructor assigns the given name to the instance
    this.name = name;
  }
}

// Create a new instance (object) of the Person class
const member = new Person('John');

// typeof is used to check the data type of 'member'
// Even though 'Person' is a class, in JavaScript, objects created
// from classes are of type 'object'
console.log(typeof member);  // Output: "object"
