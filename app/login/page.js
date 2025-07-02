"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";  
import { getSession } from "next-auth/react";

export default function Login() {
  const Router = useRouter();
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
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

    // use NextAuth's signIn
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    console.log(res);

    if (res.ok) {
  toast.success("Login successful");
  
  // fetch session to get role
  const session = await getSession();
  console.log("Session:", session);

  if (session?.user?.role === "patient") {
    Router.push("/patient");
  } else if (session?.user?.role === "doctor") {
    Router.push(`/doctor/dashboard/${session?.user?.id}`);
  } else {
    Router.push("/"); 
  }
} else {
  toast.error(res.error || "Invalid username or password");
}
  }

  return (
    <div className="flex justify-center items-center h-[88vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 "
      >
        <h2 className="text-2xl mb-4 text-center font-semibold">Login</h2>
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
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          type="submit"
        >
          Login
        </button>

        <h2 className="text-center mt-4">
          New here ?{" "}
          <Link href="/signup" className="underline text-blue-500">
            Sign up
          </Link>
        </h2>
      </form>
    </div>
  );
}

