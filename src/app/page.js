"use client";

import { useAppContext } from "@/providers/Context/AppContext";
import CandleView from "@/components/views/CandleView";
import DataAnalysis from "@/components/views/DataAnalysis";
import Header from "@/components/views/Header";
import Interactions from "@/components/views/Interactions";

import React from "react";

function Home() {
  const { selectedSymbol } = useAppContext();

  return (
    <div className="w-full flex flex-col space-y-6 ">
      <div className="w-full flex-col  z-10 pr-20 space-y-6 fixed ">
        <Header />

        <Interactions />
      </div>
      <div className=" flex flex-col z-0 space-y-6 pt-[150px]">
        <DataAnalysis />

        <CandleView symbol={selectedSymbol} />
      </div>
    </div>
  );
}

export default Home;
