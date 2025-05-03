"use client";
import React, { useEffect, useState } from "react";
import BusList from "../lib/BusData.json";
import { BustSearchListType } from "@/types/type";

const TestJson = () => {
  const [bList, setBList] = useState<BustSearchListType | null>(null);
  const [cityPairs, setCityPairs] = useState<{ from: string; to: string }[]>(
    []
  );
  console.log(bList)

  useEffect(() => {
    setBList(BusList);

    if (BusList.data.tripDetails) {
      const pairs: { from: string; to: string }[] = [];

      BusList.data.tripDetails.forEach((trip) => {
        if (trip.boardingDetails && trip.droppingDetails) {
          trip.boardingDetails.forEach((boarding) => {
            trip.droppingDetails?.forEach((dropping) => {
              pairs.push({
                from: boarding.boardingName.trim(),
                to: dropping.droppingName.trim(),
              });
            });
          });
        }
      });

      // Remove duplicates by converting to a Set and back to an array
      const uniquePairs = Array.from(
        new Set(pairs.map((pair) => JSON.stringify(pair)))
      ).map((pair) => JSON.parse(pair));

      setCityPairs(uniquePairs);
    }
  }, []);

  console.log("City Pairs:", cityPairs);

  return (
    <div>
      <h1>City Pairs</h1>
      <ul>
        {cityPairs.map((pair, index) => (
          <li key={index}>
            From: {pair.from}, To: {pair.to}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestJson;
