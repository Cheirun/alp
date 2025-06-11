import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import "./App.css";

import Login from "./Login";
import StudentPage from "./pages/StudentPage";
import ParentPage from "./pages/ParentPage";
import TherapistPage from "./pages/TherapistPage";
import OrganizationPage from "./pages/OrganizationPage";

function App() {
  // Check localStorage for theme preference
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Update localStorage and HTML class when theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={theme}>
      <Router>
        {/* Dark/Light Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            position: "fixed",
            top: 15,
            right: 15,
            fontSize: "28px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          {theme === "light" ? <FaMoon color="#333" /> : <FaSun color="#fdd835" />}
        </button>






        {/* Routing */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/parent" element={<ParentPage />} />
          <Route path="/therapist" element={<TherapistPage />} />
          <Route path="/organization" element={<OrganizationPage />} />
          

      </Routes>
      </Router>
    </div>
  );
}

export default App;
