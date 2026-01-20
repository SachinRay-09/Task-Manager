import { useState, useEffect } from "react";
import AddTask from "./Taskform";
import TaskCard from "./TaskCard";
import InProgressTask from "./inprogress";

export default function Dashboard({ setCompletedTasksData }) {
  const [progressTaskid, setProgressTaskId] = useState(null);

  const [editingTask, setEditingTask] = useState(null);

  const [tasks, setTasks] = useState(() => {
    const raw = localStorage.getItem("tasks");
    return raw ? JSON.parse(raw) : [];
  });

  const [progresstasks, setProgressTasks] = useState(() => {
    const raw = localStorage.getItem("progresstasks");
    return raw ? JSON.parse(raw) : [];
  });

  const [completedtaskid, setCompletedTaskId] = useState(null);

  const [completedtasks, setCompletedTasks] = useState(() => {
    const raw = localStorage.getItem("completedtasks");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    if (completedtaskid == null) return;
    const task = progresstasks.find((t) => t.id === completedtaskid);
    if (!task) {
      setCompletedTaskId(null);
      return;
    }
    const current = JSON.parse(localStorage.getItem("completedtasks")) || [];
    current.push(task);
    setCompletedTasks(current);
    localStorage.setItem("completedtasks", JSON.stringify(current));
    setProgressTasks((prev) => prev.filter((t) => t.id !== completedtaskid));
    setCompletedTaskId(null);
  }, [completedtaskid]);

  useEffect(() => {
    if (progressTaskid == null) return;
    const task = tasks.find((t) => t.id === progressTaskid);
    if (!task) {
      setProgressTaskId(null);
      return;
    }
    const current = JSON.parse(localStorage.getItem("progresstasks")) || [];
    current.push(task);
    setProgressTasks(current);
    localStorage.setItem("progresstasks", JSON.stringify(current));
    setTasks((prev) => prev.filter((t) => t.id !== progressTaskid));
    setProgressTaskId(null);
  }, [progressTaskid]);

  useEffect(() => {
    setCompletedTasksData(completedtasks);
  }, [completedtasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("progresstasks", JSON.stringify(progresstasks));
  }, [progresstasks]);

  const addTask = (task) => {
    const taskWithId = { ...task, id: task.id ?? Date.now() };
    setTasks((prev) => [...prev, taskWithId]);
  };

  const updateTask = (updated) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t)),
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900">
      <div className="md:col-span-1 min-w-0">
        <AddTask
          addTask={addTask}
          editingTask={editingTask}
          updateTask={updateTask}
          setEditingTask={setEditingTask}
        />
      </div>
      <div className="md:col-span-2 min-w-0">
        <TaskCard
          tasks={tasks}
          setProgressTaskId={setProgressTaskId}
          setTasks={setTasks}
          setEditingTask={setEditingTask}
        />
      </div>
      <div className="md:col-span-3 min-w-0">
        <InProgressTask
          progresstasks={progresstasks}
          setCompletedTaskId={setCompletedTaskId}
          setProgressTasks={setProgressTasks}
          addTask={addTask}
        />
      </div>
    </div>
  );
}
