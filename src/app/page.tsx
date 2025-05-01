// src/app/page.tsx
import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Bus Booking</h1>
      <SearchForm />
    </main>
  );
}
