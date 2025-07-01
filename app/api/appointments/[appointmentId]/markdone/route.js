import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(request, { params }) {
  const appointmentId = params.appointmentId;

  if (!appointmentId) {
    return Response.json({ error: "Missing appointmentId" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("appointments").updateOne(
      { _id: new ObjectId(appointmentId) },
      { $set: { status: "done" } }
    );

    if (result.modifiedCount === 0) {
      return Response.json({ error: "Appointment not found or already done" }, { status: 404 });
    }

    return Response.json({ message: "Appointment marked as done" });
  } catch (error) {
    console.error("Failed to update appointment:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
