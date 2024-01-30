export function calculateMovingAverage(data, windowSize) {
  const dates = Object.keys(data);
  const movingAverages = {};

  let sum = 0;

  // Calculate the initial sum for the first window
  for (let i = 0; i < windowSize; i++) {
    const date = dates[i];
    const closePrice = data[date] ? parseFloat(data[date]["4. close"]) : NaN;

    console.log("date:", date);
    console.log("closePrice:", closePrice);

    sum += closePrice;
  }

  // Calculate moving averages
  for (let i = windowSize - 1; i < dates.length; i++) {
    const currentDate = dates[i];

    const newestPrice = parseFloat(data[currentDate]["4. close"]);
    const oldestPrice = parseFloat(
      data[dates[i - (windowSize - 1)]]["4. close"]
    );

    // Update the sum by subtracting the oldest price and adding the newest one
    sum = sum - oldestPrice + newestPrice;

    const movingAverage = sum / windowSize;
    movingAverages[currentDate] = movingAverage.toFixed(2);
  }

  return movingAverages;
}
