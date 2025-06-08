import { useState, useEffect } from "react";
import type { FormEvent } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // Load tasks from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  }

  // Toggle task completion
  function toggleComplete(id: number) {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  // Delete task
  function handleDelete(id: number) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  // Filter tasks according to current filter state
  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true; // all
  });

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-teal-800">
        Task Tracker
      </h1>

      {/* Task input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </form>

      {/* Filter buttons */}
      <div className="flex justify-center gap-4 mt-4">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task list */}
      <ul className="mt-6 space-y-3">
        {filteredTasks.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm"
          >
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleComplete(t.id)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span
                className={`${
                  t.completed ? "line-through text-gray-400" : "text-gray-900"
                } text-lg`}
              >
                {t.text}
              </span>
            </label>
            <button
              onClick={() => handleDelete(t.id)}
              aria-label={`Delete task: ${t.text}`}
              className="text-red-500 hover:text-red-700 transition text-xl"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
