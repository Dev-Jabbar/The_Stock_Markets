export function calculateTotalValues(data) {
  // Initialize totals
  let totalOpen = 0;
  let totalHigh = 0;
  let totalLow = 0;
  let totalClose = 0;

  // Iterate through each date in the data
  for (const date in data) {
    if (data.hasOwnProperty(date)) {
      const dailyData = data[date];

      // Accumulate values
      totalOpen += parseFloat(dailyData["1. open"]);
      totalHigh += parseFloat(dailyData["2. high"]);
      totalLow += parseFloat(dailyData["3. low"]);
      totalClose += parseFloat(dailyData["4. close"]);
    }
  }

  // Round the totals to one decimal place
  totalOpen = roundToOneDecimalPlace(totalOpen);
  totalHigh = roundToOneDecimalPlace(totalHigh);
  totalLow = roundToOneDecimalPlace(totalLow);
  totalClose = roundToOneDecimalPlace(totalClose);

  // Return the rounded totals
  return {
    totalOpen,
    totalHigh,
    totalLow,
    totalClose,
  };
}

function roundToOneDecimalPlace(value) {
  return Math.round(value * 10) / 10;
}
