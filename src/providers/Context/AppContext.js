"use client";
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [stockData, setStockData] = useState([]);

  const [dataForComputations, setDataForComputations] = useState([]);
  const [FilterDataForComputations, setFilterDataForComputations] = useState(
    []
  );
  const [filteredStockData, setFilteredStockData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [startDate, setStartDate] = useState(new Date()); // Initialize with a default date
  const [endDate, setEndDate] = useState(new Date()); // Initialize with a default date
  const [selectedSymbol, setSelectedSymbol] = useState("IBM");
  const [windowSize, setWindowSize] = useState(5);
  const [movingAverages, setMovingAverages] = useState({});
  const [rsiData, setRsiData] = useState({});
  const [volumeData, setVolumeData] = useState({});
  const [isloading, setIsloading] = useState(true);

  const [totals, setTotals] = useState({});
  return (
    <AppContext.Provider
      value={{
        stockData,
        setStockData,
        seriesData,
        setSeriesData,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        filteredStockData,
        setFilteredStockData,
        dataForComputations,
        setDataForComputations,
        FilterDataForComputations,
        setFilterDataForComputations,
        selectedSymbol,
        setSelectedSymbol,
        windowSize,
        setWindowSize,
        movingAverages,
        setMovingAverages,
        rsiData,
        setRsiData,
        volumeData,
        setVolumeData,
        totals,
        setTotals,
        isloading,
        setIsloading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export { AppContextProvider, useAppContext };
