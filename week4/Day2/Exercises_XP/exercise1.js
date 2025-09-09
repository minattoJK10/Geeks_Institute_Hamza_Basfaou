// Given array
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

// Display the colors with their order
colors.forEach((color, index) => {
  console.log(`${index + 1}# choice is ${color}.`);
});

// Check if the array contains "Violet" using some()
colors.some(color => color === "Violet")
  ? console.log("Yeah")
  : console.log("No...");
