import { useState } from "react";
import { Link } from "react-router";
import Notification from "./Notification";

// Theme Toggle Component with Animation
function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  return (
    <button
      type="button"
      onClick={() => setIsDark(!isDark)}
      aria-label="Theme toggle (decorative)"
      className="relative w-14 h-8 bg-gray-700 rounded-full p-1 flex items-center cursor-pointer transition-all duration-300 hover:bg-gray-600"
    >
      {/* Background track */}
      <div className="absolute inset-1 rounded-full bg-linear-to-r from-blue-500 to-purple-600 opacity-20"></div>

      {/* Icons */}
      <span
        className={`absolute left-2 text-xs transition-opacity duration-300 ${isDark ? "opacity-50" : "opacity-100"}`}
      >
        ☀️
      </span>
      <span
        className={`absolute right-2 text-xs transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-50"}`}
      >
        🌙
      </span>

      {/* Toggle circle */}
      <span
        className={`relative w-6 h-6 rounded-full bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-lg flex items-center justify-center transform transition-all duration-300 ease-in-out ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

export default function Navbar({ task }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="sticky top-0 border-b bg-gray-900 border-gray-700 shadow-sm hover:bg-gray-800 rounded-md pl-3 py-2 transition-colors duration-200 z-40">
      <header className="p-4 pr-10 flex flex-row justify-between items-center">
        <nav>
          <Link to={"/"}>
            <h1 className="text-2xl md:text-4xl font-bold cursor-pointer ml-2 md:ml-10 text-gray-100">
              TASK BOARD
            </h1>
          </Link>
        </nav>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10 text-lg font-medium">
          <Link
            type="button"
            to={"/"}
            className="text-gray-100 hover:text-blue-400 cursor-pointer active:shadow active:bg-gray-700 rounded p-1 transition-colors duration-150"
          >
            <span>DashBoard</span>
          </Link>
          <Link
            type="button"
            to={"/Archive"}
            className="text-gray-100 hover:text-green-300 cursor-pointer active:shadow active:bg-gray-700 rounded p-1 transition-colors duration-150"
          >
            <span>Archive</span>
          </Link>
          <Link
            type="button"
            to={"/Profile"}
            className="text-gray-100 hover:text-yellow-300 cursor-pointer active:shadow active:bg-gray-700 rounded p-1 transition-colors duration-150"
          >
            <span>Profile</span>
          </Link>
        </nav>
        <div className="hidden md:flex absolute right-32 mt-2">
          <Notification task={task} />
        </div>
        {/* Theme toggle (decorative only) */}
        <div className="hidden md:flex items-center ml-2">
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-700 focus:outline-none text-gray-100"
          >
            {/* Simple Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {isOpen && (
        <nav className="md:hidden flex flex-col space-y-4 p-4 text-lg font-medium border-t border-gray-700 animate-fade-in">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-gray-100 hover:text-blue-300 cursor-pointer border border-transparent active:border-blue-300 active:shadow rounded p-2 transition duration-75"
          >
            DashBoard
          </Link>
          <Link
            to="/Archive"
            onClick={() => setIsOpen(false)}
            className="text-gray-100 hover:text-green-300 cursor-pointer border border-transparent active:border-green-300 active:shadow rounded p-2 transition duration-75"
          >
            Archive
          </Link>
          <Link
            to="/Profile"
            onClick={() => setIsOpen(false)}
            className="text-gray-100 hover:text-yellow-300 cursor-pointer border border-transparent active:border-yellow-300 active:shadow rounded p-2 transition duration-75"
          >
            Profile
          </Link>

          {/* Mobile Notification */}
          <div className="flex items-center justify-center pt-2">
            <Notification task={task} />
          </div>

          {/* Mobile Theme Toggle (decorative only) */}
          <div className="flex items-center justify-center pt-2">
            <ThemeToggle />
          </div>
        </nav>
      )}
    </div>
  );
}
