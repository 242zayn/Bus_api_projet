// src/app/booking/confirmation/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function Confirmation() {
  const router = useRouter();

  useEffect(() => {
    toast.success("Booking confirmed!");
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Booking Confirmed!</h1>
      <p>Your booking reference: #ABC123</p>
      <button
        onClick={() => router.push("/")}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Home
      </button>
    </div>
  );
}
