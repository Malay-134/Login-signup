import { useEffect, useState } from "react";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch tasks");
      console.log(data);
      setTasks(data.tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 text-left max-h-64 overflow-y-auto mb-6">
      <h2 className="text-xl font-semibold text-white mb-2">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks found.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-gray-700 px-4 py-2 rounded-md text-white flex justify-between items-center"
            >
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
