// date-operations.js
import { format, addDays } from 'date-fns';

export function performDateOperations() {
  // Get the current date
  const currentDate = new Date();
  console.log("📅 Current Date:", currentDate);

  // Add 5 days to the current date
  const futureDate = addDays(currentDate, 5);

  // Format the resulting date
  const formattedDate = format(futureDate, 'yyyy-MM-dd HH:mm:ss');

  console.log("⏩ Date after adding 5 days:", formattedDate);

  return formattedDate;
}
