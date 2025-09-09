// Given array of users
const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

//  Use map() to create welcome messages
const welcomeStudents = users.map(user => `Hello ${user.firstName}`);
console.log("Welcome Messages:", welcomeStudents);

//  Use filter() to get only Full Stack Residents
const fullStackResidents = users.filter(user => user.role === "Full Stack Resident");
console.log("Full Stack Residents:", fullStackResidents);

//  Bonus: Chain filter() and map() to get last names of Full Stack Residents
const fullStackLastNames = users
  .filter(user => user.role === "Full Stack Resident")
  .map(user => user.lastName);

console.log("Last Names of Full Stack Residents:", fullStackLastNames);

