// src/components/SearchForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

type SearchFormData = {
  from: string;
  to: string;
  date: string;
};

export default function SearchForm() {
  const { register, handleSubmit } = useForm<SearchFormData>();
  const router = useRouter();

  const onSubmit = async (data: SearchFormData) => {
    try {
      const response = await axios.post(
        "https://uat.travl.tech/api/bus/search",
        data
      );
      console.log(response);
      // Store in Redux or Context
      router.push("/booking/buses");
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("from", { required: true })}
        placeholder="From"
        className="p-2 border rounded w-full"
      />
      <input
        {...register("to", { required: true })}
        placeholder="To"
        className="p-2 border rounded w-full"
      />
      <input
        type="date"
        {...register("date", { required: true })}
        className="p-2 border rounded w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search Buses
      </button>
    </form>
  );
}
