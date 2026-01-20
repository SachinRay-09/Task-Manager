export default function InProgressTask({
  progresstasks,
  setCompletedTaskId,
  setProgressTasks,
  addTask,
}) {
  const difficultyColor = (d) =>
    d === "hard"
      ? "bg-red-600"
      : d === "medium"
        ? "bg-yellow-500"
        : "bg-green-500";

  const formatDate = (d) => {
    if (!d) return "No due date";
    try {
      const hasTime =
        typeof d === "string" && (d.includes("T") || d.includes(":"));
      const date = new Date(d);
      if (Number.isNaN(date.getTime())) return d;
      if (hasTime) {
        return date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return d;
    }
  };

  if (!progresstasks || progresstasks.length === 0) {
    return (
      <div className="p-6 min-w-0">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          IN-Progress
        </h2>
        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <div className="text-3xl">📝</div>
          <div>No tasks yet started — get started with your tasks.</div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-6 min-w-0">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        IN-Progress
      </h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {progresstasks.map((task, i) => (
          <article
            key={task.id ?? i}
            className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all p-5 flex flex-col"
            aria-labelledby={`task-title-${task.id ?? i}`}
          >
            <header className="flex items-start justify-between gap-3">
              <h3
                id={`task-title-${task.id ?? i}`}
                className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white"
              >
                {task.title || "Untitled"}
              </h3>
              <span
                className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full text-white ${difficultyColor(
                  task.difficulty,
                )}`}
                aria-label={`Difficulty: ${task.difficulty}`}
              >
                {task.difficulty?.toUpperCase() ?? "N/A"}
              </span>
            </header>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-3 wrap-break-word">
              {task.description || "No description"}
            </p>

            <footer className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={task.date || ""}>{formatDate(task.date)}</time>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Delete task"
                  onClick={() => {
                    const newtaskarray = progresstasks.filter(
                      (t) => t.id !== task.id,
                    );
                    addTask(task);
                    setProgressTasks(newtaskarray);
                  }}
                >
                  ↩ Back
                </button>
                <button
                  type="button"
                  className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-sm hover:opacity-95"
                  aria-label="Start task"
                  onClick={() => {
                    setCompletedTaskId(task.id);
                  }}
                >
                  ✅ Complete
                </button>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
