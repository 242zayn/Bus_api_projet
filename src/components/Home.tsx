"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import SearchForm from "./SearchForm";
import BusCard from "./BusCard";
import ThemeToggle from "./ThemeToggle";
import { BustSearchListType, FilterBusType, SeatMap } from "@/types/type";
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
        <div className="w-[80%]">
          <h1 className="text-white text-8xl font-bold  px-7">
            Your Journey of Exploration Begins Here !
          </h1>

          <div className="py-5 flex gap-5  justify-start px-7 mt-6">
            <Button className=" bg-red-600 px-8 py-5 ">Contact US</Button>
            <Button className=" bg-transparent border border-white px-8 py-5 ">
              Learn More
            </Button>
          </div>
        </div>
        <SearchForm
          sendDataToParent={handleDataFromChild}
        
        />
      </div>

      <div className=" py-10 bg-transparent flex gap-5 flex-wrap justify-center">
        {bList?.data.tripDetails?.map((NewBusData, index) => {
          return (
            <React.Fragment key={index}>
              <BusCard BusDetels={NewBusData} index={index} />
            </React.Fragment>
          );
        })}
      </div>

      <section>
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
    </div>
  );
};

export default Home;
