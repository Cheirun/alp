// StudentPage.js
import React from "react";
import "./StudentPage.css"; // create this file for styles
import { FaUserCircle, FaBook, FaChartBar, FaLightbulb, FaClipboardList, FaCog, FaComments } from "react-icons/fa";



function StudentPage() {
  return (
        
    <div className="student-dashboard">
      {/* Welcome + Profile Section */}
          <div className="header-section">
      <div className="profile-section">
  <img
    src="https://via.placeholder.com/100" // Placeholder image
    alt="Profile"
    className="profile-avatar"
  />
  </div>
        <div>
          <h1>Hi, Student! </h1>
          <p className="motivation">Let's make today count!</p>
        </div>
  
</div>
      

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <FaBook size={40} />
          <h3>Learning </h3>
        </div>

        <div className="dashboard-card">
          <FaChartBar size={40} />
          <h3>Progress</h3>

        </div>

        <div className="dashboard-card">
          <FaLightbulb size={40} />
          <h3> Activities</h3>

        </div>

        <div className="dashboard-card">
          <FaClipboardList size={40} />
          <h3>Notes & Assignments</h3>

        </div>

        <div className="dashboard-card">
          <FaComments size={40} />
          <h3>Feedback & Suggestions</h3>

        </div>

        <div className="dashboard-card">
          <FaCog size={40} />
          <h3>Settings</h3>

        </div>
      </div>
    </div>
  );
}




export default StudentPage;