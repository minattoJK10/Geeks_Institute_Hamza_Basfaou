// 🌟 Exercise 1 : List of people

let people = ["Greg", "Mary", "Devon", "James"];

// Remove Greg
people.shift();

// Replace James with Jason
people[people.indexOf("James")] = "Jason";

// Add your name
people.push("Hamza");

// Index of Mary
console.log(people.indexOf("Mary"));

// Copy without Mary and your name
let copy = people.slice(1, 3);
console.log(copy);

// Index of Foo
console.log(people.indexOf("Foo")); // -1

// Last element
let last = people[people.length - 1];
console.log(last);

// Part II Loops
for (let person of people) {
  console.log(person);
}

for (let person of people) {
  console.log(person);
  if (person === "Devon") break;
}
