import { useAppContext } from "@/providers/Context/AppContext";
import { calculateRSI } from "@/hooks/CalculateRSI";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"));

const RSIChart = () => {
  const {
    FilterDataForComputations,

    rsiData,
    setRsiData,
  } = useAppContext();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const calculateAndSetRSI = async () => {
      try {
        if (FilterDataForComputations) {
          const calculatedRSI = calculateRSI(FilterDataForComputations);
          setRsiData(calculatedRSI);
        }
      } catch (error) {
        console.error("Error calculating RSI:", error);
        setError("Error calculating RSI");
      }
    };

    calculateAndSetRSI();
  }, [FilterDataForComputations]);

  const options = {
    chart: {
      type: "line",
    },
    xaxis: {
      type: "datetime",
    },
  };

  const series = [
    {
      name: "RSI",
      data: Object.entries(rsiData).map(([date, value]) => ({
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
          type="line"
          height="100%"
          width="100%"
        />
      )}
    </div>
  );
};

export default RSIChart;
