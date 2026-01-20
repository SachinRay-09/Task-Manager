import { useState } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navigation";
import Archive from "./Components/Archive";
import Profile from "./Components/Profile";
import { Route, Routes } from "react-router";

export default function App() {
  const [completedtasksdata, setCompletedTasksData] = useState([]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <Routes>
        <Route
          className="mt-10"
          path="/"
          element={<Dashboard setCompletedTasksData={setCompletedTasksData} />}
        />
        <Route
          path="/Archive"
          element={<Archive completedtasksdata={completedtasksdata} />}
        />
        <Route path="/Profile" element={<Profile completedtasksdata={completedtasksdata} />} />
      </Routes>
    </div>
  );
}
