import { useAppContext } from "@/providers/Context/AppContext";
import DailyReturnsChart from "../charts/DailyReturnsChart";
import MovingAverageChart from "../charts/MovingAverageChart";
import RSIChart from "../charts/RSIChart";

import { calculateTotalValues } from "@/hooks/calculateTotalValues";
import useFetchStockData from "@/hooks/useFetchStockData";
import { Skeleton } from "@mui/material";

const DataAnalysis = () => {
  const { FilterDataForComputations } = useAppContext();
  const { isLoading } = useFetchStockData();
  const totals = calculateTotalValues(FilterDataForComputations);

  return (
    <>
      <div className="md:flex-row w-full flex flex-col-reverse gap-y-10 md:gap-0 md:flex md:space-x-5 ">
        {isLoading ? (
          <div className="md:h-[350px] 2xl:h-[500px] md:w-[70%] gap-y-10 gap-2 md:gap-y-0 grid grid-cols-1  md:grid-cols-2 dark:bg-white bg-gray-300 dark:bg-opacity-10">
            <div className=" h-[175px] 2xl:h-[200px] ">
              <div className="dark:text-gray-400 text-black mx-3 mt-1   italic text-xs 2xl:text-sm font-extrabold">
                Daily returns
              </div>
              <div className=" h-[80%] bg-[#444]  w-full">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className=" h-[175px] 2xl:h-[200px] ">
              <div className="dark:text-gray-400 text-black mx-3 mt-1   italic text-xs 2xl:text-sm font-extrabold">
                MovingAverage
              </div>
              <div className=" h-[80%] bg-[#444]  w-full">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className=" h-[175px] 2xl:h-[200px] ">
              <div className="dark:text-gray-400 text-black mx-3 mt-1   italic text-xs 2xl:text-sm font-extrabold">
                Relative Strength Index
              </div>
              <div className=" h-[80%] bg-[#444]  w-full">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="md:h-[350px] 2xl:h-[500px] md:w-[70%] gap-y-10 md:gap-y-0 grid grid-cols-1  md:grid-cols-2 dark:bg-white bg-gray-300 dark:bg-opacity-10">
            <div className=" h-[175px] 2xl:h-[200px]">
              <div className="dark:text-gray-400 text-black mx-3 mt-1   italic text-xs 2xl:text-sm font-extrabold">
                Daily returns
              </div>
              <div className=" h-full text-black w-full">
                <DailyReturnsChart />
              </div>
            </div>
            <div className=" h-[175px] 2xl:h-[200px]">
              <div className="dark:text-gray-400 text-black mx-3 mt-1   italic text-xs 2xl:text-sm font-extrabold">
                MovingAverage
              </div>
              <div className=" h-full text-black w-full">
                <MovingAverageChart />
              </div>
            </div>
            <div className=" h-[175px] 2xl:h-[200px] flex-1">
              <div className="dark:text-gray-400 text-black mx-3 mt-1 2xl:text-sm  italic text-xs font-extrabold">
                Relative Strength Index
              </div>
              <div className=" h-full text-black w-full">
                <RSIChart />
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="md:w-[30%] md:h-[350px] flex flex-col  space-y-5 justify-center items-center 2xl:h-[500px] h-[380px] dark:bg-white text-white  dark:bg-opacity-10 ">
            <div className=" h-full bg-[#444]  w-full">
              <Skeleton
                variant="rectangular"
                animation="wave"
                className="h-full w-full"
              />
            </div>
          </div>
        ) : (
          <div className="md:w-[30%] md:h-[350px] flex p-5 py-10  justify-center items-center 2xl:h-[500px] h-[380px] dark:bg-white bg-gray-300 dark:text-white text-black  dark:bg-opacity-10 ">
            <div className="h-full w-full  flex flex-col space-y-5">
              <div className="h-[50%] dark:bg-white bg-gray-400 dark:bg-opacity-5 items-center justify-between px-10 flex w-full">
                <div
                  className="flex flex-col space-y-2 p-2 "
                  title="total markert opens"
                >
                  <h1 className="text-blue-500 text-lg font-extrabold">
                    Total Open
                  </h1>
                  <div>{totals.totalOpen}</div>
                </div>
                <div
                  className="flex flex-col space-y-2"
                  title="total markert highs"
                >
                  <h1 className="text-blue-500 text-lg font-extrabold">
                    Total High
                  </h1>
                  <div>{totals.totalHigh}</div>
                </div>
              </div>
              <div className="h-[50%] dark:bg-white dark:bg-opacity-5 bg-gray-400 items-center justify-between px-10 flex w-full">
                <div
                  className="flex flex-col space-y-2"
                  title="total markert lows"
                >
                  <h1 className="text-blue-500 text-lg font-extrabold">
                    Total Low
                  </h1>
                  <div>{totals.totalLow}</div>
                </div>
                <div
                  className="flex flex-col space-y-2"
                  title="total markert close"
                >
                  <h1 className="text-blue-500 text-lg font-extrabold">
                    Total Close
                  </h1>
                  <div>{totals.totalClose}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DataAnalysis;
