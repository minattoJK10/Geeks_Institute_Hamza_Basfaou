// 🌟 Exercise 2 : Your favorite colors

const colors = ["Blue", "Red", "Green", "Black", "White"];

// Normal loop
for (let i = 0; i < colors.length; i++) {
  console.log(`My #${i + 1} choice is ${colors[i]}`);
}

// Bonus with suffix
const suffixes = ["st", "nd", "rd", "th", "th"];
for (let i = 0; i < colors.length; i++) {
  console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}
