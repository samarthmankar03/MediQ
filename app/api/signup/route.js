import bcrypt from "bcrypt";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json(); 
    const { password } = body;   

    const client = await clientPromise;
    const db = client.db();

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      ...body,
      password: hashedPassword,   
    });

    return Response.json({ message: "User signed up!", id: result.insertedId });
  } catch (error) {
    console.error("Error during signup:", error);
    return new Response(JSON.stringify({ error: "Failed to sign up" }), {
      status: 500,
    });
  }
}

