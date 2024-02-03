"use client";

import React, { useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import useStockData from "@/hooks/useFetchStockData";
import { useAppContext } from "@/providers/Context/AppContext";
import CandlestickChart from "../charts/CandlestickChart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const transformStockData = (rawData) => {
  // Check if rawData is defined and not null
  if (!rawData) {
    console.error("Raw data is undefined or null.");
    return []; // or handle it according to your use case
  }

  // Convert raw data to an array of objects
  const dataArray = Object.entries(rawData).map(([date, dataPoint]) => {
    return {
      date: new Date(date),
      open: parseFloat(dataPoint["1. open"]),
      high: parseFloat(dataPoint["2. high"]),
      low: parseFloat(dataPoint["3. low"]),
      close: parseFloat(dataPoint["4. close"]),
    };
  });

  // Sort the data by date in ascending order
  const sortedData = dataArray.sort((a, b) => a.date - b.date);

  // Transform the sorted data for candlestick chart
  return sortedData.map(({ date, open, high, low, close }) => {
    return {
      x: date,
      y: [open, high, low, close],
    };
  });
};

const CandleView = ({ symbol }) => {
  const {
    stockData,
    setStockData,
    filteredStockData,
    setFilteredStockData,
    setDataForComputations,
    setFilterDataForComputations,
  } = useAppContext();
  const { data, isLoading, isError } = useStockData(symbol);

  useEffect(() => {
    const fetchData = async () => {
      if (data && data["Information"]) {
        alert(data["Information"]);

        console.error("Additional information:", data["Information"]);
      } else if (data && !isLoading && !isError) {
        // Data has been fetched successfully
        const transformedData = transformStockData(data["Time Series (Daily)"]);

        setStockData(transformedData);
      } else if (isError) {
        // Handle error state
        console.error("Error fetching data:", isError);

        // Check if there is additional information in the error response
      }
    };

    fetchData();
  }, [data, isLoading, isError]);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      setDataForComputations(data["Time Series (Daily)"]);
      setFilterDataForComputations(data["Time Series (Daily)"]);
    }

    setFilteredStockData(stockData);
  }, [stockData]); // Update filteredStockData when stockData changes

  return (
    <>
      <div
        className={`flex  2xl:h-[600px] h-[350px] ${
          isLoading
            ? "bg-[#444] "
            : " dark:bg-white dark:bg-opacity-10 bg-gray-300"
        }   text-black`}
      >
        {isLoading ? (
          <div className="w-full h-full">
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="h-full w-full"
            />
          </div>
        ) : (
          stockData && (
            <div className="w-[99%] h-[99%]">
              <CandlestickChart data={filteredStockData} width="100%" />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default CandleView;
