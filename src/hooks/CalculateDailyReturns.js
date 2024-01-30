export function calculateDailyReturns(data) {
  // Extract and sort dates
  const dates = Object.keys(data).sort((a, b) => new Date(a) - new Date(b));

  const returns = {};

  for (let i = 1; i < dates.length; i++) {
    const currentDate = dates[i];
    const previousDate = dates[i - 1];

    // Extract closing prices for the current and previous dates
    const currentClose = parseFloat(data[currentDate]["4. close"]);
    const previousClose = parseFloat(data[previousDate]["4. close"]);

    // Calculate daily return as a percentage
    const dailyReturn = ((currentClose - previousClose) / previousClose) * 100;

    // Store the calculated daily return in the returns object with the current date as the key
    returns[currentDate] = dailyReturn.toFixed(2);
  }

  return returns;
}
