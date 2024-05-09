export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
}
