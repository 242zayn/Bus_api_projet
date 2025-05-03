"use client";

import { useParams } from "next/navigation";

export default function SeatMap() {
  // URL से busid पकड़ें (http://localhost:3000/seats/1 से '1' मिलेगा)
  const { busid } = useParams();

  return (
    <div>
      <h1>Seat Map</h1>
      <p>Current Bus ID: {busid}</p>
    </div>
  );
}
