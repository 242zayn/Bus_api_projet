// src/store/slices/bookingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  searchData: { from: string; to: string; date: string } | null;
  selectedBus: { id: string; name: string } | null;
  selectedSeats: string[];
  passengerDetails: {
    name: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
  } | null;
}

const initialState: BookingState = {
  searchData: null,
  selectedBus: null,
  selectedSeats: [],
  passengerDetails: null,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setSelectedBus: (state, action) => {
      state.selectedBus = action.payload;
    },
    // Add other reducers...
  },
});

export const { setSearchData, setSelectedBus } = bookingSlice.actions;
export default bookingSlice.reducer;