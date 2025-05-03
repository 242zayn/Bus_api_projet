"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SeatVirtualMap, SeatLayoutEntity } from "@/types/type";

const SeatMapPage = ({ busId }: { busId: string }) => {
  const [vrSeatData, setVrSeatData] = useState<SeatVirtualMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for selected seats

  const [selectedSeats, setSelectedSeats] = useState<SeatLayoutEntity[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchSeatMap = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://uat.travl.tech/api/bus/seatmap?resp=${busId}`
      );
      setVrSeatData(response.data);
    } catch (err) {
      setError("Failed to fetch seat map data");
      console.error("Error fetching seat map data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeatMap();
  }, []);

  // Handle seat selection
  const toggleSeatSelection = (seat: SeatLayoutEntity) => {
    if (!seat.bookable) return;

    const isSelected = selectedSeats.some(
      (s) => s.seatNumber === seat.seatNumber
    );

    if (isSelected) {
      setSelectedSeats(
        selectedSeats.filter((s) => s.seatNumber !== seat.seatNumber)
      );
      setTotalPrice((prev) => prev - seat.fareMaster.totalAmount);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      setTotalPrice((prev) => prev + seat.fareMaster.totalAmount);
    }
  };

  // Group seats by row if data is available
  const rows: Record<string, SeatLayoutEntity[]> = {};
  if (vrSeatData?.data?.seatLayout) {
    vrSeatData.data.seatLayout.forEach((seat) => {
      if (!rows[seat.row]) {
        rows[seat.row] = [];
      }
      rows[seat.row].push(seat);
    });

    // Sort rows and seats within each row
    Object.keys(rows).forEach((row) => {
      rows[row].sort((a, b) => a.column - b.column);
    });
  }

  const sortedRows = Object.keys(rows).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  if (loading)
    return <div className="text-center py-8">Loading seat map...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!vrSeatData)
    return <div className="text-center py-8">No seat data available</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Bus Seat Booking
        </h1>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-400 rounded mr-2"></div>
            <span>Booked</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-500 rounded mr-2"></div>
            <span>Ladies Seat</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
            <span>Selected</span>
          </div>
        </div>

        {/* Driver's area */}
        <div className="bg-gray-200 h-12 rounded-t-lg mb-4 flex items-center justify-center">
          <span className="font-semibold">Driver Cabin</span>
        </div>

        {/* Seat grid */}
        <div className="grid gap-4 mb-4">
          {sortedRows.map((row) => (
            <div key={`row-${row}`} className="flex gap-4 justify-center">
              {rows[row].map((seat) => {
                const isSelected = selectedSeats.some(
                  (s) => s.seatNumber === seat.seatNumber
                );
                return (
                  <div
                    key={`seat-${seat.seatNumber}`}
                    onClick={() => toggleSeatSelection(seat)}
                    className={`
                      w-12 h-12 rounded flex items-center justify-center cursor-pointer
                      ${
                        !seat.bookable
                          ? "bg-gray-400 cursor-not-allowed"
                          : seat.ladiesSeat
                          ? "bg-red-500 hover:bg-red-600"
                          : isSelected
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-green-500 hover:bg-green-600"
                      }
                      text-white font-medium
                      transition-colors duration-200
                      relative
                    `}
                    title={`Seat ${seat.seatNumber} - ₹${seat.fareMaster.totalAmount}`}
                  >
                    {seat.seatNumber}
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-black rounded-full w-5 h-5 flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Exit area */}
        <div className="bg-gray-200 h-12 rounded-b-lg mb-6 flex items-center justify-center">
          <span className="font-semibold">Exit</span>
        </div>

        {/* Selected seats summary */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Your Selection</h3>
          {selectedSeats.length === 0 ? (
            <p className="text-gray-600">No seats selected yet</p>
          ) : (
            <div>
              <ul className="mb-3">
                {selectedSeats.map((seat) => (
                  <li
                    key={seat.seatNumber}
                    className="flex justify-between py-1 border-b border-blue-100"
                  >
                    <span>Seat {seat.seatNumber}</span>
                    <span>₹{seat.fareMaster.totalAmount}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-blue-200">
                <span>Total:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Booking button */}
        <button
          disabled={selectedSeats.length === 0}
          className={`
            w-full py-3 px-4 rounded-lg font-bold text-white
            ${
              selectedSeats.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
            transition-colors duration-200
          `}
          onClick={() => {
            // Handle booking logic here
            alert(`Booking confirmed for ${selectedSeats.length} seat(s)!`);
          }}
        >
          {selectedSeats.length > 0
            ? `Book ${selectedSeats.length} Seat(s) for ₹${totalPrice.toFixed(
                2
              )}`
            : "Select Seats to Continue"}
        </button>
      </div>
    </div>
  );
};

export default SeatMapPage;
