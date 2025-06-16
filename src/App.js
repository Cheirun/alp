// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage/LoginPage";
import ChildDashboard from "./pages/dashboard/ChildDashboard";
import Learn from "./pages/dashboard/Learn";
import English from "./pages/dashboard/English";
import Mathematics from "./pages/dashboard/Mathematics";
import Logical from "./pages/dashboard/Logical";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<ChildDashboard />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/english" element={<English />} />
        <Route path="/mathematics" element={<Mathematics />} />
        <Route path="/logical" element={<Logical />} />
      </Routes>
    </Router>
  );
}

export default App;
