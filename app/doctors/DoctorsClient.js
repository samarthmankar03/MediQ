"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DoctorsClient() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        console.log("API data:", data);

        setDoctors(Array.isArray(data.result) ? data.result : []);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        setDoctors([]);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Our Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {doctors.map((doctor) => (
          <Link href={`/doctors/${doctor._id}`} key={doctor._id}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition">
              <Image
                src={doctor.img}
                alt={doctor.name}
                width={400} 
                height={300} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{doctor.name}</h2>
                <p className="text-gray-600 text-sm mb-1">
                  Experience: {doctor.experience}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  Qualification: {doctor.qualification}
                </p>
                <p className="text-gray-600 text-sm">
                  Speciality: {doctor.speciality}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
