"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import SearchForm from "./SearchForm";
import BusCard from "./BusCard";
import ThemeToggle from "./ThemeToggle";
import { BustSearchListType, SeatMap } from "@/types/type";
import SeatMapJson from "../lib/SeatMap.json";
import SeatMapCard from "./SeatMapCard";

const Home = () => {
  const [bList, setBList] = useState<BustSearchListType | null>(null);
  const [seatMapList, setSeatMapList] = useState<SeatMap | null>(null);

  //   console.log(bList);

  const handleDataFromChild = (data: BustSearchListType) => {
    setBList(data);
  };

  useEffect(() => {
    setSeatMapList(SeatMapJson as SeatMap);
  }, [setSeatMapList]);
  return (
    <div className="HomeOuter relative">
      <span className=" fixed top-4 right-4">
        <ThemeToggle />
      </span>
      <div className="HomeInner flex   items-center justify-center flex-col  py-32 ">
        <div className="w-full lg:w-[80%] px-4 sm:px-6 lg:px-7">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
            Your Journey of Exploration Begins Here!
          </h1>

          <div className="py-5 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-start mt-4 sm:mt-5 md:mt-6">
            <Button className="bg-red-600 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 text-sm sm:text-base hover:bg-red-700 transition-colors">
              Contact US
            </Button>
            <Button className="bg-transparent border border-white px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 text-sm sm:text-base hover:bg-white hover:text-black transition-colors">
              Learn More
            </Button>
          </div>
        </div>
        <SearchForm sendDataToParent={handleDataFromChild} />
      </div>

      <section className="flex flex-col justify-between items-center bg-slate-50 ">
        <h1 className=" text-4xl font-bold  px-7 mt-10 mb-5 text-gray-900 dark:text-white">
          Available Buses For Lucknow
        </h1>
        <div className=" py-10 bg-transparent flex gap-5 flex-wrap justify-center">
          {seatMapList?.data?.map((seatMapData, index) => {
            return (
              <React.Fragment key={index}>
                <SeatMapCard seatmapData={seatMapData} index={index} />
              </React.Fragment>
            );
          })}
        </div>
      </section>

      <div className="flex flex-col justify-between items-center ">
        <h1 className=" text-4xl font-bold  px-7 mt-10 mb-5 text-gray-900 dark:text-white">
          All Available Buses
        </h1>
        <div className=" py-10 bg-transparent flex  gap-5 flex-wrap justify-center">
          {bList?.data.tripDetails?.map((NewBusData, index) => {
            return (
              <React.Fragment key={index}>
                <BusCard BusDetels={NewBusData} index={index} />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
