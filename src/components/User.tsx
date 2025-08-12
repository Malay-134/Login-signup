import { useParams, useNavigate } from "react-router-dom";

type UserParams = {
  id: string;
};

const User = () => {
  const { id } = useParams<UserParams>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 px-4 text-white">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4">User Profile</h2>
        <p className="text-lg text-gray-300 mb-6">
          Viewing details for <span className="font-semibold text-white">user: {id}</span>  
        </p>
        <button
          onClick={() => navigate('/home')}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default User;
