import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(request, { params }) {
  try {
    const appointmentId = params.appointmentId;
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("appointments").deleteOne({
      _id: new ObjectId(appointmentId),
    });

    if (result.deletedCount === 1) {
      return Response.json({ message: "Appointment deleted successfully" });
    } else {
      return new Response(JSON.stringify({ error: "Appointment not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return new Response(JSON.stringify({ error: "Failed to delete appointment" }), {
      status: 500,
    });
  }
}
