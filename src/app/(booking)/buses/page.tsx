// // src/app/booking/buses/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import BusCard from "@/components/BusCard";
// import axios from "axios";

// type Bus = {
//   id: string;
//   name: string;
//   departureTime: string;
//   price: number;
// };

// export default function BusListings() {
//   const [buses, setBuses] = useState<Bus[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBuses = async () => {
//       try {
//         const response = await axios.get("/api/buses"); // Mock or real API
//         setBuses(response.data);
//       } catch (error) {
//         console.error("Failed to fetch buses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBuses();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Available Buses</h1>
//       <div className="grid gap-4">
//         {buses.map((bus) => (
//           <BusCard key={bus.id} bus={bus} />
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
