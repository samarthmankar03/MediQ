import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db();

   
    const hospitals = [
      {
        name: "Apollo Hospital",
        address: "123 Main Street, New Delhi",
        contact: "+91-9876543210",
        rating: 4.5,
      },
      {
        name: "Fortis Healthcare",
        address: "456 Green Avenue, Bengaluru",
        contact: "+91-9123456780",
        rating: 4.2,
      },
      {
        name: "Max Super Speciality",
        address: "789 Lake Road, Mumbai",
        contact: "+91-9988776655",
        rating: 4.3,
      },
      {
        name: "Manipal Hospital",
        address: "321 River Street, Chennai",
        contact: "+91-9090909090",
        rating: 4.0,
      },
      {
        name: "Medanta Hospital",
        address: "555 Hill View, Hyderabad",
        contact: "+91-9345678901",
        rating: 4.4,
      },
    ];

    const result = await db.collection("hospitals").insertMany(hospitals);

    return NextResponse.json({
      message: "hospitals seeded successfully!",
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: "Failed to seed doctors data" },
      { status: 500 }
    );
  }
}
