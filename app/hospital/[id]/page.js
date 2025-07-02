import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function HospitalDetailPage({ params }) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const hospital = await db.collection("hospitals").findOne({ _id: new ObjectId(params.id) });

    if (!hospital) {
      return <div className="p-8 text-red-500">Hospital not found</div>;
    }

    return (
      <div className="h-[88vh] flex justify-center items-center bg-gray-50 p-6">
        <div className="bg-white rounded-xl shadow-md max-w-3xl w-full p-8 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{hospital.name}</h1>
          <p className="text-gray-600">Location: {hospital.address}</p>
          <p className="text-gray-600">Contact: {hospital.contact}</p>
          <p className="text-gray-600">Rating: {hospital.rating}/5</p>

          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Book Appointment
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching hospital:", error);
    return <div className="p-8 text-red-500">Something went wrong</div>;
  }
}
