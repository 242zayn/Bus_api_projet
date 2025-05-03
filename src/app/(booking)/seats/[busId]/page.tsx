"use client";
import SeatMapPage from "@/components/BusSeatLayout";
import { usePathname } from "next/navigation";

export default function SeatMap() {
  const pathname = usePathname(); // URL पथ पाएं (जैसे '/seats/1')
  const busId = pathname.split("/").pop() || ""; // अंतिम भाग निकालें ('1') और डिफ़ॉल्ट मान सेट करें

  return (
    <div>
      <SeatMapPage busId={busId} />
    </div>
  );
}
