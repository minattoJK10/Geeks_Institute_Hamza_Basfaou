const prompt = require('prompt-sync')();
const minutesLived = require('./date');

const birthdate = prompt('Enter your birthdate (YYYY-MM-DD): ');
console.log(minutesLived(birthdate));
