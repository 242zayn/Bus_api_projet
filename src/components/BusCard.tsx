// src/components/BusCard.tsx
"use client";

import { useRouter } from "next/navigation";

type Bus = {
  id: string;
  name: string;
  departureTime: string;
  price: number;
};

export default function BusCard({ bus }: { bus: Bus }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/booking/seats/${bus.id}`)}
      className="border p-4 rounded-lg cursor-pointer hover:shadow-md transition"
    >
      <h3 className="font-bold">{bus.name}</h3>
      <p>Departure: {bus.departureTime}</p>
      <p>Price: ₹{bus.price}</p>
    </div>
  );
}
