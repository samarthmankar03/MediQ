export async function GET() {
  const hospitals = [
    {
      id: 1,
      name: "City Hospital",
      location: "Hyderabad",
      queue: 12,
      speciality: "Cardiology",
      rating: 4.5,
      doctorId: "686229085c08bd963f2e7737"
    },
    {
      id: 2,
      name: "Green Valley Clinic",
      location: "Bangalore",
      queue: 7,
      speciality: "Dermatology",
      rating: 4.2,
      doctorId: "6862292c5c08bd963f2e7738"
    },
    {
      id: 3,
      name: "Sunshine Medical Center",
      location: "Chennai",
      queue: 4,
      speciality: "Pediatrics",
      rating: 4.7,
      doctorId: "6862294c5c08bd963f2e7739"
    },
    // {
    //   id: 4,
    //   name: "Apollo Health Hub",
    //   location: "Delhi",
    //   queue: 18,
    //   speciality: "Orthopedics",
    //   rating: 4.8,
    // },
    // {
    //   id: 5,
    //   name: "Fortis Care",
    //   location: "Mumbai",
    //   queue: 9,
    //   speciality: "General Medicine",
    //   rating: 4.3,
    // },
    // {
    //   id: 6,
    //   name: "Lakeside Hospital",
    //   location: "Kolkata",
    //   queue: 3,
    //   speciality: "Gynecology",
    //   rating: 4.1,
    // },
    // {
    //   id: 7,
    //   name: "Healing Touch Clinic",
    //   location: "Pune",
    //   queue: 6,
    //   speciality: "ENT",
    //   rating: 4.0,
    // },
    // {
    //   id: 8,
    //   name: "Metro Hospital",
    //   location: "Ahmedabad",
    //   queue: 11,
    //   speciality: "Urology",
    //   rating: 4.4,
    // },
    // {
    //   id: 9,
    //   name: "Sai Krupa Hospital",
    //   location: "Hyderabad",
    //   queue: 5,
    //   speciality: "Neurology",
    //   rating: 4.6,
    // },
    // {
    //   id: 10,
    //   name: "Medilife Center",
    //   location: "Jaipur",
    //   queue: 2,
    //   speciality: "Oncology",
    //   rating: 4.9,
    // },
  ];

  return Response.json(hospitals);
}


