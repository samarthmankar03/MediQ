import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("appointments").insertOne({
      ...body,
      
    });

    return Response.json({
      message: "Doctor registered!",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return new Response(JSON.stringify({ error: "Failed to register" }), {
      status: 500,
    });
  }
}
