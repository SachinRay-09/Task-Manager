import { useEffect, useState } from "react";

export default function AddTask({
  addTask,
  editingTask,
  updateTask,
  setEditingTask,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    difficulty: "medium",
    timeOn: false,
  });

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title ?? "",
        description: editingTask.description ?? "",
        date: editingTask.date ?? "",
        difficulty: editingTask.difficulty ?? "medium",
        timeOn: editingTask.timeOn,
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "date" || name === "datetime-local") {
      const selecteddate = new Date(value);
      const currentdate = new Date();
      if (selecteddate < currentdate) {
        alert("Don't select past date, dumb");

        return;
      }
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setForm({
      title: "",
      description: "",
      date: "",
      difficulty: "medium",
      timeOn: false,
    });
    if (typeof setEditingTask === "function") setEditingTask(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask && typeof updateTask === "function") {
      updateTask({ ...form, id: editingTask.id });
      setEditingTask(null);
    } else if (typeof addTask === "function") {
      addTask({ ...form, id: Date.now() });
    }
    setForm({
      title: "",
      description: "",
      date: "",
      difficulty: "medium",
      timeOn: false,
    });
  };

  return (
    <div className="w-full max-w-full sm:max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Add Task
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            placeholder="Task Name"
            value={form.title}
            onChange={handleChange}
            className="w-full min-w-0 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-md p-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            className="w-full min-w-0 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-md p-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter the task description"
            rows={4}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="timeOn"
            checked={form.timeOn}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 rounded"
          />
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Include time in due date
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Due Date *
          </label>
          {form.timeOn ? (
            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full min-w-0 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-md p-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ) : (
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full min-w-0 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-md p-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Difficulty *
          </label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full min-w-0 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-md p-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value={"easy"}>Easy</option>
            <option value={"medium"}>Medium</option>
            <option value={"hard"}>Hard</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:opacity-95"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
