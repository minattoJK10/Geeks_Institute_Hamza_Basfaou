//  Exercise 1 : Checking the BMI

const person1 = {
  fullName: "John Doe",
  mass: 75,     // kg
  height: 1.8,  // meters
  calcBMI: function() {
    return this.mass / (this.height * this.height);
  }
};

const person2 = {
  fullName: "Jane Smith",
  mass: 68,
  height: 1.65,
  calcBMI: function() {
    return this.mass / (this.height * this.height);
  }
};


function compareBMI(p1, p2) {
  const bmi1 = p1.calcBMI();
  const bmi2 = p2.calcBMI();

  if (bmi1 > bmi2) {
    console.log(`${p1.fullName} has the larger BMI (${bmi1.toFixed(2)})`);
  } else if (bmi2 > bmi1) {
    console.log(`${p2.fullName} has the larger BMI (${bmi2.toFixed(2)})`);
  } else {
    console.log(`Both have the same BMI (${bmi1.toFixed(2)})`);
  }
}

compareBMI(person1, person2);
