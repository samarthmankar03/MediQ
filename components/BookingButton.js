"use client"
import { useRouter } from "next/navigation"

export default function BookingButton({doctorId}){
    const Router = useRouter();

    function handleClick(){
        Router.push(`/doctors/${doctorId}/booking`)
    }
    return(
        <div className="text-center">
            <button onClick={handleClick} className="bg-blue-500 text-white border rounded p-2 w-full cursor-pointer">Book Appointment</button>
        </div>
    )
}