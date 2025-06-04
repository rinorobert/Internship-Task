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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(t.id)}
            />
            <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
              {t.text}
            </span>
            <button onClick={() => handleDelete(t.id)} aria-label={`Delete task: ${t.text}`}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
