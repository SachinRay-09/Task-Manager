import { useState } from "react";

export default function Notification() {
  function calculateDaysLeft(dueDateStr) {
    const dueDate = new Date(dueDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    const diffMs = dueDate - today;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const progresstasks = JSON.parse(localStorage.getItem("progresstasks")) || [];
  const pendingtasks = tasks.map((task) => {
    if (calculateDaysLeft(task.date) <= 3) return [task.title, task.date];
    else {
      return false;
    }
  });
  const pendingprogresstask = progresstasks.map((task) => {
    if (calculateDaysLeft(task.date) <= 3) return [task.title, task.date];
    else {
      return false;
    }
  });
  const pending = [...pendingtasks, ...pendingprogresstask].filter(Boolean);


  const [isopen, setIsOpen] = useState(false);

  return (
    <div className="inline-block relative">
      <button
        onClick={() => setIsOpen(!isopen)}
        className="cursor-pointer border-none relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.9a1 1 0 0 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.402 2.07-1.07 2.828A1.99 1.99 0 0 0 1 10h14a1.99 1.99 0 0 0-.93-1.172A4.992 4.992 0 0 0 13 6a5.002 5.002 0 0 0-4.005-4.9z" />
        </svg>
        {/* Notification count badge */}
        {pending.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {pending.length}
          </span>
        )}
      </button>
      {isopen && (
        <div className="absolute right-0 md:right-0 md:mt-2 mt-2 bg-gray-900 text-white border border-blue-900 rounded-2xl shadow-lg w-60 z-50 md:translate-x-0 -translate-x-1/2 left-1/2 md:left-auto">
          {pending.length === 0 ? (
            <p className="p-2 m-0">No notifications</p>
          ) : (
            pending.map((note, i) => (
              <p key={i} className="flex justify-between p-3 mb-2">
                <span>{note[0]}</span>
                <span>{note[1]}</span>
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
}
