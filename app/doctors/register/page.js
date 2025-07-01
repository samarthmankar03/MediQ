"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RegisterDoctorPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    qualification: "",
    experience: "",
    img: "",
    speciality: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "loading") {
      toast.error("Please wait until login finishes");
      return;
    }

    if (!session) {
      toast.error("You must be logged in to register as a doctor");
      return;
    }

    try {
      const res = await fetch("/api/doctor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Successfully registered!");
        router.push("/doctor/dashboard/" + data.id);
      } else {
        toast.error(data.error || "Failed to register");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-[88vh] flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center">Register Doctor</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="experience"
          placeholder="Experience (e.g., 5 years)"
          value={formData.experience}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={formData.img}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="speciality"
          placeholder="Speciality"
          value={formData.speciality}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {status === "loading" ? "Loading..." : "Register Doctor"}
        </button>
      </form>
    </div>
  );
}
