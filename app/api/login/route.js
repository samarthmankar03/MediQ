import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";



export async function POST(request) {
  try {
    const {email , password } = await request.json();

    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found. Please sign up first." }), { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid password" }), { status: 401 });
    }

    return new Response(JSON.stringify({
      message: "Login successful",
      role: user.role,
      doctorId: user._id.toString(),
    }));

  } catch (error) {
    console.error("Error during login:", error);
    return new Response(JSON.stringify({ error: "Failed to login" }), {
      status: 500,
    });
  }
}
