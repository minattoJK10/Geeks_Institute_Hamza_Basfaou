// Original JS object
const marioGame = {
  detail : "An amazing game!",
  characters : {
      mario : {
        description:"Small and jumpy. Likes princesses.",
        height: 10,
        weight: 3,
        speed: 12,
      },
      bowser : {
        description: "Big and green, Hates princesses.",
        height: 16,
        weight: 6,
        speed: 4,
      },
      princessPeach : {
        description: "Beautiful princess.",
        height: 12,
        weight: 2,
        speed: 2,
      }
  },
}

// 1️⃣ Convert JS object into a JSON string
const jsonMario = JSON.stringify(marioGame);

// Log the JSON string
console.log("JSON string:", jsonMario);

// Nested objects: Notice how `characters` and its children are also converted to JSON format

// 2️⃣ Pretty print the JSON object
const prettyJsonMario = JSON.stringify(marioGame, null, 2);
console.log("Pretty JSON:\n", prettyJsonMario);

// 3️⃣ Add a debugger breakpoint
debugger; // Open your browser inspector, the code will stop here

// You can now inspect `jsonMario` and `prettyJsonMario` in the debugger
