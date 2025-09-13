// Base Dog class
class Dog {
  constructor(name) {
    this.name = name;
  }
};

// ✅ Correct way to extend the Dog class Option 2
class Labrador extends Dog {
  constructor(name, size) {
    // Call the parent class constructor with 'super'
    // 'super(name)' initializes the 'name' property in the Dog class
    super(name);  
    // Add the new property specific to the Labrador class
    this.size = size;
  }
};

// Example test
const lab = new Labrador('Buddy', 'Large');
console.log(lab.name); // Output: Buddy
console.log(lab.size); // Output: Large
