function createCalendar(year, month) {
  // Step 1: Days of the week starting with Monday
  const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  // Step 2: Create the table
  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.textAlign = "center";
  table.style.width = "350px";
  table.style.margin = "20px auto";
  table.style.fontFamily = "Arial, sans-serif";

  // --- Create table header with day names ---
  const headerRow = document.createElement("tr");
  days.forEach((day, index) => {
    const th = document.createElement("th");
    th.textContent = day;
    th.style.border = "1px solid #000";
    th.style.padding = "8px";
    th.style.backgroundColor = "#f0f0f0";

    // Highlight Saturday & Sunday headers
    if (index === 5 || index === 6) {
      th.style.backgroundColor = "#ffe0e0";
      th.style.color = "#b00000";
    }

    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Step 3: Calculate first and last days
  const firstDay = new Date(year, month - 1, 1); // months are 0-indexed
  const lastDay = new Date(year, month, 0).getDate(); // last day of the month

  // Get the index of the first day (Monday = 0, Sunday = 6)
  let startDay = firstDay.getDay();
  startDay = (startDay === 0 ? 6 : startDay - 1); // Adjust so Monday = 0

  // Step 4: Fill the calendar
  let currentDay = 1;
  for (let i = 0; i < 6; i++) { // Maximum 6 weeks in a month
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      cell.style.border = "1px solid #000";
      cell.style.padding = "8px";

      if ((i === 0 && j < startDay) || currentDay > lastDay) {
        cell.textContent = "."; // Empty cells
        cell.style.color = "#ccc";
      } else {
        cell.textContent = currentDay;

        // Bonus Improvement: Highlight weekends
        if (j === 5 || j === 6) {
          cell.style.backgroundColor = "#ffe0e0"; // Light red background
          cell.style.color = "#b00000"; // Dark red text
          cell.style.fontWeight = "bold";
        }

        currentDay++;
      }

      row.appendChild(cell);
    }

    table.appendChild(row);

    // Stop creating rows if all days are filled
    if (currentDay > lastDay) break;
  }

  // Step 5: Add table to the DOM
  document.body.appendChild(table);
}

// Example usage
createCalendar(2012, 9); // September 2012
