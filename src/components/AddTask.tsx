import { useState } from "react";
import { handleError, handleSuccess } from "../utils";

interface Props {
  onTaskAdded: () => void;
}

const AddTask: React.FC<Props> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("User not authenticated");

    try {
      const res = await fetch("http://localhost:5000/tasks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add task");

      setTitle("");
      onTaskAdded();
      handleSuccess("Task added successfully");
    } catch (err) {
      handleError("Error adding task");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        className="flex-1 px-4 py-2 rounded-l-md border border-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={handleAdd}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md transition duration-200 shadow-md"
      >
        Add
      </button>
    </div>
  );
};

export default AddTask;
