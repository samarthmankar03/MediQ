"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function DoctorDashboard() {
  const params = useParams();
  const doctorId = params.doctorID;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorId) return;

    const fetchAppointments = async () => {
      try {
        const res = await fetch(`/api/doctor/${doctorId}/appointments`);
        const data = await res.json();
        if (res.ok) {
          setAppointments(data);
        } else {
          toast.error(data.error || "Failed to load appointments");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const markAsDone = async (appointmentId) => {
  try {
    const res = await fetch(`/api/appointments/${appointmentId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setAppointments((prev) => prev.filter((app) => app._id !== appointmentId));
      toast.success("Appointment removed successfully");
    } else {
      const data = await res.json();
      toast.error(data.error || "Failed to delete appointment");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};


  return (
    <div className="h-[89vh] bg-gray-50 flex flex-col">
      <header className="px-6 py-4 shadow">
        <h1 className="text-2xl font-semibold">Doctor Dashboard</h1>
        <p className="text-sm opacity-80">Doctor ID: {doctorId || "Loading..."}</p>
      </header>

      <main className="flex-1 p-6 grid gap-6 md:grid-cols-12">
        {/* Appointments section */}
        <div className="bg-white rounded-2xl shadow p-4 md:col-span-8">
          <h2 className="text-lg font-semibold mb-4">Today's Appointments</h2>
          <hr />

          {loading ? (
            <p className="mt-4 text-gray-500">Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p className="mt-4 text-gray-500">No appointments today.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {appointments.map((app) => (
                <li key={app._id} className="p-4 border rounded-lg shadow-sm">
                  <p><strong>Patient:</strong> {app.name}</p>
                  <p><strong>Time:</strong> {app.time}</p>
                  <p><strong>Reason:</strong> {app.reason}</p>
                  <p><strong>Status:</strong> {app.status || "pending"}</p>
                  {app.status !== "done" && (
                    <button
                      onClick={() => markAsDone(app._id)}
                      className="mt-2 px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Mark as Done
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Notifications section */}
        <div className="bg-white rounded-2xl shadow p-4 md:col-span-4">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <hr />
          <ul className="text-gray-600 list-disc ml-4 mt-4 space-y-2">
            <li>New message from Admin</li>
            <li>Weekly report available</li>
            <li>Reminder: Complete pending reports</li>
          </ul>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-4">
        &copy; {new Date().getFullYear()} MediQ. All rights reserved.
      </footer>
    </div>
  );
}
