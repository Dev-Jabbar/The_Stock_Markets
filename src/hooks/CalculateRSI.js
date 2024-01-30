export function calculateRSI(data, period = 14) {
  // Extracting dates from the data object
  const dates = Object.keys(data);

  // Object to store calculated RSI values for each date
  const rsis = {};

  // Loop through the data starting from the 'period' index
  for (let i = period; i < dates.length; i++) {
    // Current date in the loop
    const currentDate = dates[i];

    // Arrays to store gains and losses for the current period
    const gains = [];
    const losses = [];

    // Loop through the data for the current period
    for (let j = i - (period - 1); j <= i; j++) {
      // Calculate the difference in close prices
      const closeDiff =
        parseFloat(data[dates[j]]["4. close"]) -
        parseFloat(data[dates[j - 1]]["4. close"]);

      // Classify the difference as gain or loss
      closeDiff > 0 ? gains.push(closeDiff) : losses.push(Math.abs(closeDiff));
    }

    // Calculate average gains and losses for the current period
    const averageGain = gains.reduce((sum, gain) => sum + gain, 0) / period;
    const averageLoss = losses.reduce((sum, loss) => sum + loss, 0) / period;

    // Calculate Relative Strength (RS) and Relative Strength Index (RSI)
    const rs = averageGain / averageLoss;
    const rsi = 100 - 100 / (1 + rs);

    // Store the calculated RSI value in the rsis object
    rsis[currentDate] = rsi.toFixed(2); // Adjust decimal places as needed
  }

  // Return the object containing dates and corresponding RSI values
  return rsis;
}
