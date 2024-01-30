import { useAppContext } from "@/providers/Context/AppContext";
import { calculateDailyReturns } from "@/hooks/CalculateDailyReturns";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"));

const DailyReturnsChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { FilterDataForComputations } = useAppContext();
  const dailyReturns = calculateDailyReturns(FilterDataForComputations);
  const chartOptions = {
    chart: {
      id: "daily-returns-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "Daily Returns (%)",
      },
    },
  };

  const chartSeries = [
    {
      name: "Daily Returns",
      data: Object.entries(dailyReturns)
        .sort((a, b) => new Date(b[0]) - new Date(a[0])) // Sort dates in descending order
        .map(([date, returnPercentage]) => ({
          x: new Date(date),
          y: parseFloat(returnPercentage),
        })),
    },
  ];

  return (
    <div>
      {isClient && (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height="100%"
          width="100%"
        />
      )}
    </div>
  );
};

export default DailyReturnsChart;
