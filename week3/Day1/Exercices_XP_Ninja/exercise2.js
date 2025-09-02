//  Exercise 2 : Grade Average


function calculateAverage(gradesList) {
  let sum = 0;
  for (let i = 0; i < gradesList.length; i++) {
    sum += gradesList[i];
  }
  return sum / gradesList.length;
}

function findAvg(gradesList) {
  const avg = calculateAverage(gradesList);
  console.log("Average:", avg);

  if (avg > 65) {
    console.log("Congratulations, you passed!");
  } else {
    console.log("You failed, you must repeat the course.");
  }
}


findAvg([70, 80, 60]); // Passed
findAvg([50, 40, 60]); // Failed
