import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const client = await clientPromise;
  const db = client.db();

  try {
    const doctor = await db.collection("doctors").findOne({ _id: new ObjectId(params.id) });
    if (!doctor) {
      return Response.json({ error: "Doctor not found" }, { status: 404 });
    }
    return Response.json(doctor);
  } catch (error) {
    return Response.json({ error: "Error fetching doctor" }, { status: 500 });
  }
}
