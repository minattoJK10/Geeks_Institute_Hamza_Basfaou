//  Pattern with one loop

let stars = "";
for (let i = 1; i <= 6; i++) {
  stars += "* ";          // add one star each iteration
  console.log(stars.trim());
}

//  Pattern with nested loops

for (let i = 1; i <= 6; i++) {
  let row = "";
  for (let j = 1; j <= i; j++) {
    row += "* ";
  }
  console.log(row.trim());
}
