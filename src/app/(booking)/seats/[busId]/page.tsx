// src/app/booking/seats/[busId]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import SeatMap from "@/components/SeatMap";
import { useEffect, useState } from "react";
import axios from "axios";

type Seat = {
  number: string;
  available: boolean;
  price: number;
};

export default function SeatSelection() {
  const { busId } = useParams();
  const router = useRouter();
  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.post(
          `https://uat.travl.tech/api/bus/seatmap?resp=${busId}`
        );
        setSeats(response.data.seats);
      } catch (error) {
        console.error("Failed to fetch seats:", error);
      }
    };
    fetchSeats();
  }, [busId]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Select Seats</h1>
      <SeatMap seats={seats} />
      <button
        onClick={() => router.push("/booking/passenger")}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Proceed to Passenger Details
      </button>
    </div>
  );
}
