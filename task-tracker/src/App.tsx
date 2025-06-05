import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  }

  function toggleComplete(id: number) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function handleDelete(id: number) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={task}
          onChange={handleChange}
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

      <ul className="mt-6 space-y-3">
        {tasks.map((t) => (
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
