import { useAppContext } from "@/providers/Context/AppContext";
import useSWR from "swr";

// Define a function to fetch data
const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  if (!data) {
  }
  return data;
};

// Use the fetcher function with SWR
const useFetchStockData = (symbol) => {
  const { isloading, setIsloading } = useAppContext();

  const { data, error } = useSWR(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.NEXTJS_API_KEY}`,
    fetcher,
    {
      refreshInterval: 24 * 60 * 60 * 1000,
      onSuccess: () => {
        setIsloading(false); // Set loading state to false on successful data fetch
      },
      onError: () => {
        setIsloading(false); // Set loading state to false on error
      },
    }
  );

  return {
    data,
    isLoading: isloading,
    isError: error,
  };
};

export default useFetchStockData;

//  `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.NEXTJS_API_KEY}`

//  "http://localhost:3000/api/TimeSeries"
