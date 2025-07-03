"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role,
      }),
    });

    const data = await res.json();
    const doctorID = data.id;

    if (res.ok) {
      toast.success("Successfully signed up");
      if (role == "doctor") {
        router.push(`/doctor/dashboard/${doctorID}`);
      } else {
        router.push("/hospitals");
      }
    } else {
      toast.error("Add valid inputs");
    }
  }

  return (
    <div className="flex justify-center h-[88vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 mt-20 mb-72"
      >
        <h2 className="text-2xl mb-4 text-center font-semibold">Sign Up</h2>
        <input
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
