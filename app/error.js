'use client'; 

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <h1 className="text-3xl font-bold mb-4">Something went wrong 😢</h1>
      <button
        onClick={() => reset()}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}
