import { useState, Suspense, lazy } from "react";
import "./App.css";
// import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navigation";
// import Archive from "./Components/Archive";
// import Profile from "./Components/Profile";
import { Route, Routes } from "react-router";

const Dashboard = lazy(() => import("./Components/Dashboard"));
const Archive = lazy(() => import("./Components/Archive"));
const Profile = lazy(() => import("./Components/Profile"));

function Spinner() {
  return (
    <div className="flex justify-center items-center h-64">
      {" "}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>{" "}
    </div>
  );
}

export default function App() {
  const [completedtasksdata, setCompletedTasksData] = useState([]);
  const [task, setTask] = useState([]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar task={task} />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            className="mt-10"
            path="/"
            element={
              <Dashboard
                setCompletedTasksData={setCompletedTasksData}
                setTask={setTask}
              />
            }
          />
          <Route
            path="/Archive"
            element={<Archive completedtasksdata={completedtasksdata} />}
          />
          <Route
            path="/Profile"
            element={<Profile completedtasksdata={completedtasksdata} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}
