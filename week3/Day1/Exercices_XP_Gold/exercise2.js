//  Exercise 2 : Attendance

const guestList = {
  randy: "Germany",
  karla: "France",
  wendy: "Japan",
  norman: "England",
  sam: "Argentina"
};

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What is your name? ", function(name) {
  let lowerName = name.toLowerCase(); // object keys are lowercase

  if (lowerName in guestList) {
    console.log(`Hi! I'm ${name}, and I'm from ${guestList[lowerName]}.`);
  } else {
    console.log("Hi! I'm a guest.");
  }

  rl.close();
});
