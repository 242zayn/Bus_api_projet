// src/components/BusCard.tsx
"use client";

import { DataEntity } from "@/types/type";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { useRouter } from "next/navigation";
interface SeatMapCardProps {
  seatmapData: DataEntity;
  index: number;
}

export default function SeatMapCard({ seatmapData, index }: SeatMapCardProps) {
  const router = useRouter();
  const redirectSheet = () => {
    router.push(`/seats/${index + 1}`);
  };
  return (
    <div
      key={index}
      className="max-w-sm p-6 bg-orange-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Volvo AC Sleeper - IntrCity SmartBus
        </h3>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-200">
          AC
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">From</p>
          <p className="font-bold dark:text-white">
            {seatmapData.boardingDetails?.map((bordingName, index) => {
              return <div key={index}>{bordingName.boardingName}</div>;
            })}
          </p>
        </div>

        <div className="rotate-45 flex justify-center items-center">
          <OpenInFullIcon />
        </div>

        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">To</p>
          <p className="font-bold dark:text-white">
            {" "}
            {seatmapData.droppingDetails?.map((dropingName, index) => {
              return <div key={index}>{dropingName.droppingName}</div>;
            })}
          </p>
        </div>
      </div>

      {/* Timing Information */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Departure</p>
          <p className="font-bold dark:text-white">
            {" "}
            {seatmapData.boardingDetails?.map((bordingName, index) => {
              return <div key={index}>{bordingName.boardingTime}</div>;
            })}
          </p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Arrival</p>
          <p className="font-bold dark:text-white">
            {" "}
            {seatmapData.droppingDetails?.map((dropingName, index) => {
              return <div key={index}>{dropingName.droppingName}</div>;
            })}
          </p>
        </div>
      </div>

      {/* Price and Action */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Price</p>
          <p className="font-bold text-lg dark:text-white">₹1,899</p>
        </div>
        <button
          onClick={redirectSheet}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Select Seats
        </button>
      </div>
    </div>
  );
}
