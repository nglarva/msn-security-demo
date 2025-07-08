function getFirstDateOfWeekFromYearWeek(year, week) {
  // Create a date object set to the first Sunday of the year
  const firstDayOfYear = new Date(year, 0, 1); // Jan 1
  const dayOfWeek = firstDayOfYear.getDay(); // 0 (Sun) to 6 (Sat)
  
  // Get the first Sunday of the year
  const firstSunday = new Date(firstDayOfYear);
  firstSunday.setDate(firstDayOfYear.getDate() + (7 - dayOfWeek) % 7);
  
  // Add weeks to get to the correct week
  const dateInWeek = new Date(firstSunday);
  dateInWeek.setDate(firstSunday.getDate() + (week * 7));

  // Get the first day of the month of this date
  return new Date(dateInWeek.getFullYear(), dateInWeek.getMonth(), dateInWeek.getDate());
}

// Example usage
const result = getFirstDateOfWeekFromYearWeek(2025, 27);
console.log(result.toISOString().split('T')[0]); // "2025-06-01"
