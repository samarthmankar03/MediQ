"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function Header() {
  const Router = useRouter();
  const { data: session, status } = useSession();

  return (
    <header className="h-20 bg-sky-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-semibold">
        <Link href="/">MediQ</Link>
      </h1>

      <div className="flex gap-8 items-center">
        <div>
          {status === "loading" ? (
            <div>Loading...</div>
          ) : session ? (
            session.user.role === "patient" ? (
              <div className="flex gap-4">
              <Link href={"/patient"}>
                Home
              </Link>
              <Link href={"/patient/dashboard/" + session.user.id}>
                Dashboard
              </Link>
              <Link href={"/about"}>
                about
              </Link>
              </div>
            ) : (
              <div className="flex gap-4">
              <Link href={"/doctors/register"}>
                Register
              </Link>
              <Link href={"/doctor/dashboard/" + session.user.id}>
                Dashboard
              </Link>
              <Link href={"/about"}>
                about
              </Link>
              </div>
            )
          ) : null}
        </div>
        {status === "loading" ? (
          <div>Loading...</div>
        ) : session ? (
          // User is logged in → show logout button
          <button
            onClick={() => {
              toast.success("Logged out successfully");
              signOut({ callbackUrl: "/login" });
            }}
            className="bg-white text-blue-600 px-4 py-1 rounded cursor-pointer"
          >
            Logout
          </button>
        ) : (
          // User is not logged in → show login button
          <button
            onClick={() => Router.push("/login")}
            className="bg-white text-blue-600 px-4 py-1 rounded cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
