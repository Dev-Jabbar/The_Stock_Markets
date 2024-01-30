import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"));

const CandlestickChart = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const options = {
    chart: {
      type: "candlestick",
    },
    title: {
      text: "Candlestick Chart",
    },
    xaxis: {
      type: "datetime",
    },
  };

  return isClient && data && data.length > 0 ? (
    <Chart
      options={options}
      series={[{ data: data }]}
      type="candlestick"
      width="100%"
      height="100%"
    />
  ) : null;
};

export default CandlestickChart;
