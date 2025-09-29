// date.js
const Holidays = require('date-holidays');

function nextHolidayDynamic(country = 'US') {
    const now = new Date();
    const hd = new Holidays(country);

    // Get all holidays for the current year
    const holidays = hd.getHolidays(now.getFullYear());

    // Find the next holiday
    const upcomingHoliday = holidays.find(holiday => new Date(holiday.date) > now);

    if (!upcomingHoliday) return "No more holidays this year!";

    const holidayDate = new Date(upcomingHoliday.date);
    const diffMs = holidayDate - now;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    return {
        today: now.toLocaleString(),
        holidayName: upcomingHoliday.name,
        holidayDate: holidayDate.toLocaleString(),
        remaining: `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
    };
}

module.exports = nextHolidayDynamic;
