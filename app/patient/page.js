"use client";
import { useRouter } from "next/navigation";

export default function PatientPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[88vh] bg-gray-100 p-4">
      
      <h1 className="text-3xl font-semibold mb-8">Welcome, Patient!</h1>
      <p className="text-gray-500 mb-6">
        MediQ helps you connect with hospitals and doctors around you quickly
        and easily.
      </p>

      <div className="flex gap-24 w-1/2 h-1/3 place-content-between">
        <div
          onClick={() => router.push("/hospitals")}
          className="w-2/3 cursor-pointer bg-white shadow-md rounded-xl p-6 text-center hover:bg-blue-50 transition"
        >
          <p className="text-lg font-medium text-gray-800 underline">Nearby Hospitals</p>
          <p className="mt-8">
            "Find trusted hospitals near your location for quick access and
            emergency care."
          </p>
        </div>

        <div
          onClick={() => router.push("/doctors")}
          className="w-2/3 cursor-pointer bg-white shadow-md rounded-xl p-6 text-center hover:bg-green-50 transition"
        >
          <p className="text-lg font-medium text-gray-800 underline">Nearby Doctors</p>
          <p className="mt-8">
            "Browse experienced doctors available nearby and book your
            appointment instantly."
          </p>
        </div>
      </div>
    </div>
  );
}
