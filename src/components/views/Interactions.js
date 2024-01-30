import React, { useState } from "react";
// eslint-disable-next-line react/prop-types
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import { useAppContext } from "@/providers/Context/AppContext";
import { FaFilter } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
function Interactions() {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    stockData,
    setFilteredStockData,
    selectedSymbol,
    setSelectedSymbol,
    dataForComputations,

    setFilterDataForComputations,
    windowSize,
    setWindowSize,
  } = useAppContext();

  const error = console.error;
  console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  const filterDataByDateRange = () => {
    const filteredData = stockData.filter((data) => {
      const currentDate = new Date(data.x);
      return currentDate >= startDate && currentDate <= endDate;
    });

    setFilteredStockData(filteredData);
    filterComputationData();
  };

  const filterComputationData = () => {
    // Filter the original data based on the selected date range
    const filteredData = Object.keys(dataForComputations).reduce(
      (result, date) => {
        const currentDate = new Date(date);

        if (currentDate >= startDate && currentDate <= endDate) {
          result[date] = dataForComputations[date];
        }

        return result;
      },
      {}
    );

    setFilterDataForComputations(filteredData);
  };

  const resetData = () => {
    setFilteredStockData(stockData);
    setFilterDataForComputations(dataForComputations);
  };

  const handleSymbolChange = (event) => {
    setSelectedSymbol(event.target.value);
  };

  const handleWindowSizeChange = (event) => {
    setWindowSize(event.target.value);
  };

  return (
    <>
      <div className=" flex space-x-4  overflow-x-scroll md:overflow-hidden   ">
        <div className="md:w-[50%] w-[1000px]  h-10  space-x-4 flex">
          <div className="w-[100%] h-10 dark:bg-white bg-gray-300  dark:bg-opacity-10 space-x-2 dark:text-white text-black flex pl-5 items-center ">
            <div className="font-sm  text-xs md:text-base 2xl:text-lg md:w-auto w-[70px] dark:text-gray-600">
              Select Date
            </div>
            <span>
              <DatePicker
                title="start date"
                className="dark:bg-white   dark:bg-opacity-10 md:w-40 w-[130px]  cursor-pointer text-center dark:text-gray-400"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                dateFormat="yyyy-MM-dd"
              />
            </span>
            <span className="text-sm dark:text-gray-600">To</span>
            <span>
              <DatePicker
                title="end date  "
                className="dark:bg-white dark:bg-opacity-10  md:w-40 w-[130px] cursor-pointer dark:text-gray-400  text-center"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                dateFormat="yyyy-MM-dd"
              />
            </span>
            <span title="filter data ">
              <FaFilter
                className="w-4 h-4 text-green-500 ml-2 cursor-pointer"
                onClick={filterDataByDateRange}
              />
            </span>

            <span title="reset data">
              <GrPowerReset
                className="w-5 h-5 text-green-500 hover:animate-spin cursor-pointer md:mr-auto mr-4 md:ml-4"
                onClick={resetData}
              />
            </span>
          </div>
        </div>

        <div className="md:w-[50%] w-1000 h-10  space-x-4 flex">
          <div className="w-[100%] pr-1 h-10 dark:bg-white dark:bg-opacity-10 bg-gray-300 space-x-2 text-white flex pl-1  items-center ">
            <span
              className="font-sm dark:text-gray-600 text-black md:w-auto w-[88px] 2xl:text-lg text-xs md:text-base"
              type="Enter a market Symbol"
            >
              Select Symbol
            </span>
            <input
              title="Stock market symbol"
              type="text"
              value={selectedSymbol}
              onChange={handleSymbolChange}
              placeholder="e.g., IBM"
              className="md:w-[150px] w-[100px] 2xl:w-[200px] h-6 cursor-pointer dark:text-gray-400 dark:bg-white text-black dark:bg-opacity-10 border border-gray-300 p-1 rounded-md"
            />
          </div>
          <div className="w-[100%] h-10 dark:bg-white pl-2 dark:bg-opacity-10 bg-gray-300 space-x-2 text-white flex md:pl-5 items-center ">
            <span
              type="Enter a market Symbol"
              className="font-sm dark:text-gray-600 text-black text-xs 2xl:text-base md:text-base"
            >
              windowSize
            </span>
            <input
              title="windowSize for moving averages"
              type="text"
              value={windowSize}
              onChange={handleWindowSizeChange}
              placeholder="example, 10"
              className="md:w-[150px] w-[50px] 2xl:w-[200px] h-6 cursor-pointer text-black  dark:text-gray-400 dark:bg-white dark:bg-opacity-10  border border-gray-300 p-1 rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Interactions;
