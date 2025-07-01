import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function PatientDashboard({ params }) {
  
  const patientId = params.patientID;

  const session = await getServerSession(authOptions);
  const client = await clientPromise;
  const db = client.db();

  const appointments = await db
    .collection("appointments")
    .find({ patientId: patientId })
    .toArray();
  
  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "patient") {
    redirect("/unauthorized");
  }

  return (
    <div className="h-[89vh] bg-gray-50 flex flex-col">
  
      <header className="px-6 py-4 shadow">
        <h1 className="text-2xl font-semibold">Patient Dashboard</h1>
        <p className="text-sm opacity-80">Patient ID: {patientId}</p>
      </header>

 
      <main className="flex-1 p-6 grid gap-6 md:grid-cols-12">

        <div className="bg-white rounded-2xl shadow p-4 md:col-span-8">
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          <hr />

          <ul className="mt-4 space-y-4">
            {appointments.map((appointment) => (
              <li
                key={appointment._id.toString()}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-blue-600">
                    
                    {appointment.doctorName}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {appointment.date} at {appointment.time}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

  
        <div className="bg-white rounded-2xl shadow p-4 md:col-span-4">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <hr />
          <ul className="mt-4 list-disc list-inside text-gray-700">
            <li>Lab results available</li>
            <li>New message from doctor</li>
          </ul>
        </div>
      </main>

 
      <footer className="text-center text-xs text-gray-500 py-4">
        &copy; {new Date().getFullYear()} MediQ. All rights reserved.
      </footer>
    </div>
  );
}
