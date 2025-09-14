// Parent class Bird
class Bird {
  constructor() {
    // When Bird's constructor is executed, this message will be logged
    console.log("I'm a bird. 🦢");
  }
}

// Child class Flamingo that inherits from Bird
class Flamingo extends Bird {
  constructor() {
    // Step 1: This message is logged first when creating a Flamingo instance
    console.log("I'm pink. 🌸");

    // Step 2: Call the parent class (Bird) constructor
    // This is REQUIRED before using `this` in the subclass
    super();
  }
}

// Create an instance of Flamingo
const pet = new Flamingo();
