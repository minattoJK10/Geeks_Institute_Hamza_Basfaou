// script.js

const nextHoliday = require('./date');

const holidayInfo = nextHoliday();

console.log(`📅 Today's Date: ${holidayInfo.today}`);
console.log(`🎉 Next Holiday: ${holidayInfo.holidayName}`);
console.log(`🗓 Holiday Date: ${holidayInfo.holidayDate}`);
console.log(`⏳ Time Remaining: ${holidayInfo.remaining}`);
