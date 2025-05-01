// src/app/booking/passenger/page.tsx
"use client";

import PassengerForm from "@/components/PassengerForm";

export default function PassengerDetails() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Passenger Details</h1>
      <PassengerForm />
    </div>
  );
}