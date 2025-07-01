// app/not-found.js
export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
