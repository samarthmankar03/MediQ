import AppointmentForm from "@/components/AppointmentForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function BookingPage({ params }) {
  const doctorId = params.id;

  const session = await getServerSession(authOptions);
  const patientId = session?.user?.id;   

  console.log("doctorId:", doctorId, "patientId:", patientId);

  return (
    <AppointmentForm doctorId={doctorId} patientId={patientId} />
  );
}
