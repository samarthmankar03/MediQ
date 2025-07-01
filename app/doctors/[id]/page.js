import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import BookingButton from "@/components/BookingButton";

export default async function DoctorDetailPage({ params }) {
  const doctorId = params.id;
  try {
    const client = await clientPromise;
    const db = client.db();

    const doctor = await db.collection("doctors").findOne({ _id: new ObjectId(params.id) });

    if (!doctor) {
      return <div className="p-4 text-center text-gray-600">Doctor not found</div>;
    }
    
    return (
      <div className="h-[88vh] bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-3xl">
          {/* Image */}
          <div className="h-64 sm:h-80 md:h-96 overflow-hidden flex justify-center">
            <img 
              src={doctor.img} 
              alt={doctor.name} 
              className="object-cover m-4"
            />
          </div>

          {/* Info */}
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-semibold text-gray-800">{doctor.name}</h1>

            <div className="grid grid-cols-2 gap-4 text-gray-600 text-base">
              <div><span className="font-medium">Age:</span> {doctor.age}</div>
              <div><span className="font-medium">Experience:</span> {doctor.experience}</div>
              <div><span className="font-medium">Qualification:</span> {doctor.qualification}</div>
              <div><span className="font-medium">Speciality:</span> {doctor.speciality}</div>
            </div>
            
            <BookingButton doctorId={doctorId} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return <div className="p-4 text-red-500">Something went wrong</div>;
  }
}
