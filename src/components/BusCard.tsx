// src/components/BusCard.tsx
"use client";

import { TripDetailsEntity } from "@/types/type";
import { useRouter } from "next/navigation";

interface BusCardProps {
  BusDetels: TripDetailsEntity;
  index: number;
}

export default function BusCard({ BusDetels, index }: BusCardProps) {
  const router = useRouter();
  // console.log(BusDetels);

  const PrindID = () => {
    alert(index + 1);
    router.push(`/booking/seats/${index + 1}`);
  };
  return (
    <div
      // onClick={() => router.push(`/booking/seats`)}
      className="max-w-sm p-6 bg-red-200 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          IntrCity SmartBus
        </h3>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-200">
          {/* AC Sleeper */}
          {BusDetels.busType}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">From</p>
          <p className="font-bold dark:text-white">
            {BusDetels.boardingDetails?.map((fLoction, index) => (
              <div key={index}>{fLoction.boardingName}</div>
            ))}
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Duration</p>
          <p className="font-bold dark:text-white">{BusDetels.duration}</p>
        </div>

        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">To</p>
          <p className="font-bold dark:text-white">
            {" "}
            {BusDetels.droppingDetails?.map((fLoction, index) => (
              <div key={index}>{fLoction.droppingName}</div>
            ))}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Departure</p>
          <p className="font-bold dark:text-white">
            {" "}
            {BusDetels.boardingDetails?.map((fLoction, index) => (
              <div key={index}>{fLoction.boardingTime}</div>
            ))}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            31 Dec 2024
          </p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Arrival</p>
          <p className="font-bold dark:text-white">
            {" "}
            {BusDetels.droppingDetails?.map((fLoction, index) => (
              <div key={index}>{fLoction.droppingTime}</div>
            ))}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">1 Jan 2025</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Price</p>
          <p className="font-bold text-lg dark:text-white">
            ₹{" "}
            {BusDetels.fareMasters?.[0]?.totalAmount
              ? (BusDetels.fareMasters[0].totalAmount * 85).toFixed(2)
              : "Price not available"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Available Seats
          </p>
          <p className="font-bold text-lg dark:text-white">
            {BusDetels.availableSeats}
          </p>
        </div>
      </div>
      <button
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
        onClick={PrindID}
      >
        Select Seats
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  );
}
