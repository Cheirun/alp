import React from 'react';
import { useNavigate } from 'react-router-dom';
import './therapistDashboard.css';

import activityIcon from '../../assets/icons/book.png';
import contactIcon from '../../assets/icons/contact.png';
import studentIcon from '../../assets/icons/progress.png'; // or use another suitable icon

const TherapistDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="therapist-dashboard-container">
      <div className="sidebar">
        <h2>Therapist</h2>
        <ul>
          <li onClick={() => navigate('/add-activities')}>
            <img src={activityIcon} alt="Activities" /> Add Activities
          </li>
          <li onClick={() => navigate('/contact-admin')}>
            <img src={contactIcon} alt="Contact" /> Contact Admin
          </li>
          <li>
            <img src={studentIcon} alt="Student Data" /> Student Data
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h1>Student Progress Overview</h1>
        <div className="coming-soon">
          📊 Student progress tracking coming soon!
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard;


