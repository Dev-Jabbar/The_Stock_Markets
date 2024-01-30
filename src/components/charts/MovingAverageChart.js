import { useAppContext } from "@/providers/Context/AppContext";
import { calculateMovingAverage } from "@/hooks/calculateMovingAverage";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"));

const MovingAverageChart = () => {
  const [isClient, setIsClient] = useState(false);

  const {
    FilterDataForComputations,

    windowSize,
    movingAverages,
    setMovingAverages,
  } = useAppContext();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (FilterDataForComputations) {
      try {
        const calculatedMovingAverages = calculateMovingAverage(
          FilterDataForComputations,
          windowSize
        );
        setMovingAverages(calculatedMovingAverages);
      } catch (error) {
        console.error("Error calculating moving averages:", error.message);
      }
    }
  }, [FilterDataForComputations, windowSize]);

  const options = {
    chart: {
      type: "scatter",
    },
    xaxis: {
      type: "datetime", // x-axis represents dates
    },
  };

  const series = [
    {
      name: "Moving Average",
      data: Object.entries(movingAverages).map(([date, value]) => ({
        x: new Date(date).getTime(),
        y: parseFloat(value),
      })),
    },
  ];

  return (
    <div>
      {isClient && (
        <Chart
          options={options}
          series={series}
          type="scatter"
          height="100%"
          width="100%"
        />
      )}
    </div>
  );
};

export default MovingAverageChart;
