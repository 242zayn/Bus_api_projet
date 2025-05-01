// src/components/SeatMap.tsx
"use client";

import { useState } from "react";

type Seat = {
  number: string;
  available: boolean;
  price: number;
};

export default function SeatMap({ seats }: { seats: Seat[] }) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (seatNumber: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {seats.map((seat) => (
        <button
          key={seat.number}
          onClick={() => toggleSeat(seat.number)}
          disabled={!seat.available}
          className={`p-2 rounded ${
            selectedSeats.includes(seat.number)
              ? "bg-green-500 text-white"
              : seat.available
              ? "bg-gray-200 hover:bg-gray-300"
              : "bg-red-200 cursor-not-allowed"
          }`}
        >
          {seat.number}
        </button>
      ))}
    </div>
  );
}
