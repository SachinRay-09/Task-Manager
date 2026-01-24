export default function Archive({ completedtasksdata }) {
  completedtasksdata = JSON.parse(localStorage.getItem("completedtasks")) || [];
  const difficultyColor = (d) =>
    d === "hard"
      ? "bg-gradient-to-r from-red-500 to-red-600"
      : d === "medium"
        ? "bg-gradient-to-r from-yellow-500 to-orange-500"
        : "bg-gradient-to-r from-green-500 to-emerald-500";

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

  if (completedtasksdata.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <div className="text-center animate-bounce-in">
          <div className="text-8xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold text-gray-300 mb-2">
            No Tasks Completed Yet
          </h1>
          <p className="text-gray-500 text-lg">
            Complete some tasks to see your achievements here!
          </p>
          <div className="mt-6 text-4xl animate-pulse">✨</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-w-0">
      {/* Header with celebration */}
      <div className="text-center mb-8 animate-slide-up">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-4xl animate-bounce">🎉</span>
          <h2 className="text-3xl font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            COMPLEtED TASKS
          </h2>
          <span className="text-4xl animate-bounce animation-delay-200">
            🎊
          </span>
        </div>
        <p className="text-gray-400 text-lg">
          You've completed{" "}
          <span className="font-bold text-green-400">
            {completedtasksdata.length}
          </span>{" "}
          task{completedtasksdata.length !== 1 ? "s" : ""}!
          <span className="ml-2">Keep up the great work! 💪</span>
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {["easy", "medium", "hard"].map((difficulty, index) => {
          const count = completedtasksdata.filter(
            (task) => task.difficulty === difficulty,
          ).length;
          const percentage =
            completedtasksdata.length > 0
              ? ((count / completedtasksdata.length) * 100).toFixed(1)
              : 0;

          return (
            <div
              key={difficulty}
              className={`bg-gray-800 rounded-xl p-4 text-center animate-slide-up animate-delay-${(index + 1) * 100}`}
            >
              <div
                className={`text-2xl font-bold ${difficultyColor(difficulty)} bg-clip-text text-transparent`}
              >
                {count}
              </div>
              <div className="text-gray-400 capitalize">{difficulty} Tasks</div>
              <div className="text-sm text-gray-500">{percentage}%</div>
            </div>
          );
        })}
      </div>

      {/* Tasks grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {completedtasksdata.map((task, i) => (
          <article
            key={task.id ?? i}
            className={`bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 p-6 flex flex-col animate-slide-up animate-delay-${Math.min(((i % 4) + 1) * 100, 400)} group relative overflow-hidden`}
            aria-labelledby={`task-title-${task.id ?? i}`}
          >
            {/* Celebration sparkles */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-yellow-400 animate-pulse">✨</span>
            </div>

            {/* Completion badge */}
            <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <span>✓</span>
              <span>Done</span>
            </div>

            <header className="flex items-start justify-between gap-3 mt-8">
              <h3
                id={`task-title-${task.id ?? i}`}
                className="text-lg md:text-xl font-semibold text-white group-hover:text-green-300 transition-colors duration-300"
              >
                {task.title || "Untitled"}
              </h3>
              <span
                className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full text-white ${difficultyColor(
                  task.difficulty,
                )} shadow-lg`}
                aria-label={`Difficulty: ${task.difficulty}`}
              >
                {task.difficulty === "hard" && "🔥"}
                {task.difficulty === "medium" && "⚡"}
                {task.difficulty === "easy" && "🌟"}
                {task.difficulty?.toUpperCase() ?? "N/A"}
              </span>
            </header>

            <div className="flex flex-col gap-4 mt-4 grow">
              <p className="text-sm text-gray-300 line-clamp-3 grow">
                {task.description || "No description"}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                <time
                  className="text-sm text-gray-400 flex items-center gap-1"
                  dateTime={task.date || ""}
                >
                  <span>📅</span>
                  {formatDate(task.date)}
                </time>

                {/* Fun completion indicator */}
                <div className="text-green-400 text-lg animate-pulse">🎯</div>
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </article>
        ))}
      </div>

      {/* Footer celebration */}
      {completedtasksdata.length > 0 && (
        <div className="text-center mt-12 animate-slide-up">
          <div className="text-6xl mb-4">🏆</div>
          <p className="text-gray-400 text-lg">
            Amazing work! You're on fire! 🔥
          </p>
        </div>
      )}
    </div>
  );
}
