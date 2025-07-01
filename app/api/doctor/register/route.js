import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "doctor") {
      return Response.json({ error: "Only doctors can register doctor profile" }, { status: 403 });
    }

    const body = await request.json();

    const requiredFields = ["name", "age", "qualification", "experience", "img", "speciality"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return Response.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    const client = await clientPromise;
    const db = client.db();

    const newDoctor = {
      userId: session.user.id,      
      email: session.user.email,  
      name: body.name,
      age: body.age,
      qualification: body.qualification,
      experience: body.experience,
      speciality: body.speciality,
      img: body.img,
    };

    const result = await db.collection("doctors").insertOne(newDoctor);

    return Response.json({ message: "Doctor registered!", id: result.insertedId });
  } catch (error) {
    console.error("Error during registration:", error);
    return Response.json({ error: "Failed to register" }, { status: 500 });
  }
}
