"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppointmentForm({ doctorId, patientId }) {
  const Router = useRouter();

  const [doctorName, setDoctorName] = useState("");   
  const [form, setForm] = useState({
    name: "",
    patientId: patientId || "",
    email: "",
    date: "",
    time: "",
    reason: "",
    doctorId: doctorId || "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`/api/doctors/${doctorId}`);
        const data = await res.json();
        setDoctorName(data.name);  
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };
    if (doctorId) fetchDoctor();
  }, [doctorId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, doctorId, patientId, doctorName }),
      });
      const data = await res.json();
      console.log("Server response:", data);
      toast.success("Appointment sent");
      if (data.success) {
        setSubmitted(true);
      }
      Router.push(`/patient/dashboard/${patientId}`);
    } catch (err) {
      console.error("Error booking appointment:", err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold">Book Appointment</h2>
      {submitted ? (
        <div className="text-green-600">Appointment booked successfully!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Doctor Name:</label>
            <input
              type="text"
              name="doctorName"
              value={doctorName}
              readOnly
              className="w-full border p-2 rounded bg-gray-100 text-gray-500"
            />
          </div>
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Date:</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Time:</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Reason:</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      )}
    </div>
  );
}
