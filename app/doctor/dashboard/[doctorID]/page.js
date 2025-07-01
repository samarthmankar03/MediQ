import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DoctorDashboard from "./DoctorDashboard";

export default async function DoctorDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  if (session.user.role !== "doctor") {
    redirect("/unauthorized");
  }

  return <DoctorDashboard />;
}

