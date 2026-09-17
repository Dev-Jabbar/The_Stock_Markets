export function calculateMovingAverage(data, windowSize) {
  const dates = Object.keys(data);
  const movingAverages = {};

  let sum = 0;

  // Calculate the initial sum for the first window
  for (let i = 0; i < windowSize; i++) {
    const date = dates[i];
    const closePrice = data[date] ? parseFloat(data[date]["4. close"]) : NaN;

    sum += closePrice;
  }

  // The initial sum already IS the first window's total, so record its
  // average directly rather than re-running the slide step on it.
  movingAverages[dates[windowSize - 1]] = (sum / windowSize).toFixed(2);

  // Slide the window forward one day at a time, starting from the day
  // AFTER the first window, dropping the oldest price and adding the
  // newest one each step.
  for (let i = windowSize; i < dates.length; i++) {
    const currentDate = dates[i];

    const newestPrice = parseFloat(data[currentDate]["4. close"]);
    const oldestPrice = parseFloat(data[dates[i - windowSize]]["4. close"]);

    sum = sum - oldestPrice + newestPrice;

    const movingAverage = sum / windowSize;
    movingAverages[currentDate] = movingAverage.toFixed(2);
  }

  return movingAverages;
}
