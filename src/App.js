import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/loginpage/LoginPage';
import ChildDashboard from './pages/dashboard/ChildDashboard';
import TherapistDashboard from './pages/dashboard/TherapistDashboard';
import Learn from './pages/dashboard/Learn';
import English from './pages/dashboard/English';

import AddActivities from './pages/dashboard/AddActivities';
import TherapistSettings from './pages/dashboard/TherapistSettings';
import ContactAdmin from './pages/dashboard/ContactAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/child-dashboard" element={<ChildDashboard />} />
        <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/english" element={<English />} />

        {/* Therapist Pages */}
        <Route path="/add-activities" element={<AddActivities />} />
        <Route path="/therapist-settings" element={<TherapistSettings />} />
        <Route path="/contact-admin" element={<ContactAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
