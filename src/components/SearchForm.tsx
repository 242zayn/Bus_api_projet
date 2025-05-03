"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { BustSearchListType } from "@/types/type";
import BusList from "../lib/BusData.json";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import busJsonData from "../lib/Filterbus.json";

type SearchFormData = {
  from: string;
  to: string;
  date: string;
};
type ChildProps = {
  sendDataToParent: (data: BustSearchListType) => void;
};

const defaultCities = ["Hyderabad", "Bangalore", "Delhi", "Mumbai"];

export default function SearchForm({ sendDataToParent }: ChildProps) {
  const { register, handleSubmit, setValue } = useForm<SearchFormData>();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);
  const [bList, setBList] = useState<BustSearchListType | null>(null);
  const [cityPairs, setCityPairs] = useState<{ from: string; to: string }[]>(
    []
  );

  const [filteredBuses, setFilteredBuses] = useState<any[]>([]);
  useEffect(() => {
    const GetCityFun = async () => {
      try {
        const ListData = await axios.post(
          "https://uat.travl.tech/api/bus/search"
        );
        const apiData = ListData.data;
        sendDataToParent(apiData);
        setBList(apiData);
      } catch (error) {
        console.log("error during fetching api" + error);
      }
    };
    GetCityFun();

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

  const handleInputChange = (value: string, field: "from" | "to") => {
    setActiveField(field);

    if (showSuggestions) {
      const matched = cityPairs.map((pair) => `${pair.from} → ${pair.to}`);
      setSuggestions(matched);
    } else {
      setSuggestions(
        defaultCities.filter((city) =>
          city.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleSuggestionClick = (text: string) => {
    if (text.includes("→")) {
      // full route, set both
      const [from, to] = text.split("→").map((s) => s.trim());
      setValue("from", from);
      setValue("to", to);
    } else if (activeField) {
      setValue(activeField, text);
    }

    setSuggestions([]);
  };

  const onSubmit = async (data: SearchFormData) => {
    // console.log(data);

    const filterBusData = (from: string, to: string) => {
      if (!bList) return [];

      return BusList.data.tripDetails.filter((trip) => {
        const fromMatch = trip.boardingDetails.some((boarding) =>
          boarding.boardingName.toLowerCase().includes(from.toLowerCase())
        );

        const toMatch = trip.droppingDetails.some((dropping) =>
          dropping.droppingName.toLowerCase().includes(to.toLowerCase())
        );
        return fromMatch && toMatch;
      });
    };

    if (bList) {
      const filteredBuses = filterBusData(data.from, data.to);
      console.log("Filtered Buses:", filteredBuses);
      setFilteredBuses(filteredBuses);
      // setFilterBus(filteredBuses);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow w-11/12 md:w-4/5 mx-auto border mt-5"
      >
        {/* Inputs */}
        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          <input
            autoComplete="off"
            {...register("from", { required: true })}
            placeholder="From"
            onChange={(e) => handleInputChange(e.target.value, "from")}
            onFocus={() => setActiveField("from")}
            className="flex-1 p-3 border rounded"
          />
          <input
            autoComplete="off"
            {...register("to", { required: true })}
            placeholder="To"
            onChange={(e) => handleInputChange(e.target.value, "to")}
            onFocus={() => setActiveField("to")}
            className="flex-1 p-3 border rounded"
          />
          <input
            type="date"
            {...register("date", { required: true })}
            className="flex-1 p-3 border rounded"
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-center mb-4 gap-2">
          <input
            type="checkbox"
            checked={showSuggestions}
            onChange={() => setShowSuggestions(!showSuggestions)}
            id="showSuggestions"
          />
          <label htmlFor="showSuggestions" className="text-sm">
            Dily Bus List
          </label>
        </div>

        {/* Suggestion List */}
        {suggestions.length > 0 && (
          <div className="border rounded p-2 mb-4 bg-gray-50 max-h-40 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 hover:bg-blue-100 cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
          <button
            type="button"
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
          >
            All Bus List
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
            onClick={() => {
              setValue("from", "");
              setValue("to", "");
              setValue("date", "");
              setSuggestions([]);
            }}
          >
            Reset
          </button>
        </div>
      </form>

      <section className="py-10 bg-transparent flex gap-5 flex-wrap justify-center">
        {filteredBuses.length > 0 &&
          filteredBuses.map((data, index) => (
            <div
              key={index}
              className="max-w-sm p-6 bg-orange-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {data.busType || "Volvo AC Sleeper (2+1)"}
                </h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-200">
                  {data.AC ? "AC" : "Non-AC"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    From
                  </p>
                  <p className="font-bold dark:text-white">
                    {data.boardingDetails?.[0]?.boardingName ||
                      "Mumbai Central"}
                  </p>
                </div>

                <div className="rotate-45 flex justify-center items-center">
                  <OpenInFullIcon />
                </div>

                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">To</p>
                  <p className="font-bold dark:text-white">
                    {data.droppingDetails?.[0]?.droppingName ||
                      "Bangalore Majestic"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Departure
                  </p>
                  <p className="font-bold dark:text-white">
                    {data.departureTime || "10:00 PM"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Arrival
                  </p>
                  <p className="font-bold dark:text-white">
                    {data.arrivalTime || "06:00 AM"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Duration
                  </p>
                  <p className="font-bold dark:text-white">
                    {data.duration || "8 Hours"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Available Seats
                  </p>
                  <p className="font-bold dark:text-white">
                    {data.availableSeats || "12"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Price
                  </p>
                  <p className="font-bold text-lg dark:text-white">
                    ₹{data.fareMasters?.[0]?.totalAmount || "1,499"}
                  </p>
                </div>
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Select Seats
                </button>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}
