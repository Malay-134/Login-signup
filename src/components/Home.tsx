import { useEffect, useState } from "react";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("LoggedInUser");
    setLoggedInUser(loggedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("LoggedInUser");
    handleSuccess("Logout successful");
    setTimeout(() => nav("/login"), 1000);
  };

  const handleTaskAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 px-4 text-white">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-10 w-full max-w-xl text-center">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to Fomo 🚀</h1>
        <p className="text-lg text-gray-300 mb-6">
          Hello, <span className="font-semibold text-white">{loggedInUser}</span>
        </p>
        <AddTask onTaskAdded={handleTaskAdded} />
        <TaskList key={refresh.toString()} />

        <button
          onClick={handleLogout}
          className="mt-6 bg-purple-600 hover:bg-purple-700 transition-colors duration-300 px-6 py-2 rounded-full font-medium text-white shadow-lg"
        >
          Logout
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Home;
