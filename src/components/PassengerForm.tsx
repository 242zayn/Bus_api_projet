// src/components/PassengerForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type PassengerData = {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
};

export default function PassengerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassengerData>();
  const router = useRouter();

  const onSubmit = (data: PassengerData) => {
    // Save to Redux or Context
    router.push("/booking/confirmation");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("name", { required: "Name is required" })}
        placeholder="Name"
        className="p-2 border rounded w-full"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      {/* Add other fields similarly */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Confirm Booking
      </button>
    </form>
  );
}
