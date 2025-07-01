import clientPromise from "@/lib/mongodb";

export default async function HomePage() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const hospitals = await db.collection("hospitals").find().toArray();

    return (
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Available Hospitals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitals.map((hospital) => (
            <a
              key={hospital._id}
              href={`/hospital/${hospital._id}`}
              className="bg-white p-4 rounded shadow hover:bg-blue-50 transition"
            >
              <h3 className="text-lg font-bold">{hospital.name}</h3>
              <p className="text-gray-600">{hospital.location}</p>
              <p className="text-gray-500 text-sm">Contact: {hospital.contact}</p>
              <p className="text-gray-500 text-sm">Rating: ⭐ {hospital.rating}</p>
            </a>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return <div className="p-8 text-red-500">Error loading hospitals</div>;
  }
}
