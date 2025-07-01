import clientPromise from "@/lib/mongodb";

export async function GET() {
  try { 
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("doctors")
      .find({}, { projection: { name: 1, age: 1, experience: 1, speciality: 1, qualification: 1, img: 1 } })
      .toArray();

    return Response.json({ message: "data fetched", result });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Failed to get doctors data" }), {
      status: 500,
    });
  }
}
