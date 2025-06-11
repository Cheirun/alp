import React from 'react';
import './ParentPage.css';
import { FaChartBar, FaFileDownload, FaUserGraduate, FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ParentPage() {
  return (
    <div className="parent-container">
      <div className="parent-header">
        <h2>Welcome, Parent </h2>
        <p className="motivational-line">Empower your child's learning journey today.</p>
      </div>

      <div className="parent-dashboard-grid">
        <Link to="/child-progress" className="parent-card">
          <FaUserGraduate size={36} />
          <h3>Learning Progress</h3>
        </Link>

        <Link to="/performance-analytics" className="parent-card">
          <FaChartBar size={36} />
          <h3>Performance Analytics</h3>
        </Link>

        <Link to="/parent-feedback" className="parent-card">
          <FaComments size={36} />
          <h3>Feedback</h3>
        </Link>
      </div>

      <div className="download-section">
        <button className="download-btn">
          <FaFileDownload style={{ marginRight: '8px' }} />
          Download Progress Report
        </button>
      </div>

      
    </div>
  );
}

export default ParentPage;