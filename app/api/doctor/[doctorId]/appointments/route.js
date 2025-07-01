import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const doctorId = params.doctorId;
    const client = await clientPromise;
    const db = client.db();

    const doctor = await db.collection("doctors").findOne({ userId: doctorId });
    console.log("doctor:", doctor);

    const docId = String(doctor._id);
    console.log(String(docId));


    
    const appointments = await db
      .collection("appointments")
      .find({ doctorId: docId })  
      .toArray();

    return Response.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch appointments" }), {
      status: 500,
    });
  }
}
