class Counter {
  constructor() {
    // Initialize count property to 0
    this.count = 0;
  }

  // Method to increment the count
  increment() {
    this.count++;
  }
}

// Create a new Counter instance
const counterOne = new Counter();

// Call increment() twice on counterOne
counterOne.increment(); // count = 1
counterOne.increment(); // count = 2

// Assign counterOne to counterTwo
// ⚠️ This does NOT create a copy! 
// Both variables now reference the SAME object in memory.
const counterTwo = counterOne;

// Increment using counterTwo
// This will also affect counterOne because they share the same reference.
counterTwo.increment(); // count = 3

// Log the count
console.log(counterOne.count); // Output: 3
