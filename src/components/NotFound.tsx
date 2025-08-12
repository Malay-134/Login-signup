import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white px-6">
      <h1 className="text-6xl font-bold mb-4 text-pink-500">404</h1>
      <p className="text-2xl font-semibold mb-2">Page Not Found</p>
      <p className="text-md text-gray-400 mb-6">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-pink-600 hover:bg-pink-700 transition px-6 py-2 rounded-full text-white font-semibold shadow-lg"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
