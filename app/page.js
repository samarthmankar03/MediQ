

"use client"; // needed if you want click handlers (client-side)

import { useRouter } from "next/navigation";



export default function HomePage() {
  const router = useRouter();

  const handlePatientClick = () => {
    router.push("/signup?role=patient"); 
  };

  const handleDoctorClick = () => {
    router.push("/signup?role=doctor");
  };

  return (
    <div className="h-[89.5vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <h1 className="text-5xl font-bold mb-20 text-blue-800">Welcome to MediQ</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl ">
        <button 
          onClick={handlePatientClick}
          className="bg-white shadow-md rounded-xl p-6 hover:bg-blue-50 transition cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">For Patients</h2>
          <p className="text-gray-600 text-sm">Check queue, join hospitals & more</p>
        </button>

        <button 
          onClick={handleDoctorClick}
          className="bg-white shadow-md rounded-xl p-6 hover:bg-blue-50 transition cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">For Doctors</h2>
          <p className="text-gray-600 text-sm">View and manage your patient queue</p>
        </button>
      </div>
    </div>
  );
}
