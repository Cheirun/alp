/*
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import { FaBook, FaPuzzlePiece, FaChartLine } from 'react-icons/fa';
//import FaceEmotionDetector from './FaceEmotionDetector';
import FaceEmotionDetector from '../components/FaceEmotionDetector';


const subjects = ['English', 'Math', 'Logical Reasoning'];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});
  const [emotion, setEmotion] = useState('Neutral');

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  // Load progress from localStorage
  useEffect(() => {
    const storedProgress = JSON.parse(localStorage.getItem('progress')) || {};
    const formatted = {};
    subjects.forEach(subject => {
      formatted[subject] = storedProgress[subject]?.length || 0;
    });
    setProgress(formatted);
  }, []);

  return (
    <div className="student-dashboard">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <h1 className="dashboard-heading">Welcome, Learner!</h1>
      <p className="dashboard-subheading">Let's Make Today Count!</p>

      <div className="dashboard-icons">
        <div className="dashboard-card" onClick={() => navigate('/learning-modules')}>
          <FaBook className="icon" />
          <span>Learning Modules</span>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/activities')}>
          <FaPuzzlePiece className="icon" />
          <span>Activities</span>
        </div>

        <div className="dashboard-card">
          <FaChartLine className="icon" />
          <span>Progress Tracker</span>
        </div>
      </div>

      <div className="progress-section">
        <h2>Progress Tracker</h2>
        {subjects.map(subject => (
          <p key={subject}>
            <strong>{subject}:</strong> {progress[subject] || 0}/3 activities completed
          </p>
        ))}
      </div>

      {/* Face Emotion Detector in the corner }
      <div className="emotion-detector-box">
        <FaceEmotionDetector onEmotionDetected={(emo) => setEmotion(emo)} />
        <p className="emotion-label">
          😊 Current Emotion: <strong>{emotion}</strong>
        </p>
      </div>
    </div>
  );
};

export default StudentDashboard;*/

/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import { FaBook, FaPuzzlePiece, FaChartLine, FaComments } from 'react-icons/fa';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showProgress, setShowProgress] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  // Get subject-wise progress
  const progressData = JSON.parse(localStorage.getItem('progress')) || {};

  const getProgress = (subject) => {
    const total = 3;
    const completed = progressData[subject]?.length || 0;
    return `${completed} / ${total}`;
  };

  return (
    <div className="student-dashboard">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <h1 className="dashboard-heading">Welcome, Learner!</h1>
      <p className="dashboard-subheading">Let's Make Today Count!</p>

      <div className="dashboard-icons">
        <div className="dashboard-card" onClick={() => navigate('/learning-modules')}>
          <FaBook className="icon" />
          <span>Learning Modules</span>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/activities')}>
          <FaPuzzlePiece className="icon" />
          <span>Activities</span>
        </div>

        <div className="dashboard-card" onClick={() => setShowProgress(!showProgress)}>
          <FaChartLine className="icon" />
          <span>Progress Tracker</span>
        </div>

        <div className="dashboard-card" onClick={() => setShowMessages(!showMessages)}>
          <FaComments className="icon" />
          <span>Feedback & Messages</span>
        </div>
      </div>

      {showProgress && (
        <div className="progress-section">
          <h2>📈 Progress Tracker</h2>
          <ul className="progress-list">
            <li><strong>English:</strong> {getProgress('English')}</li>
            <li><strong>Math:</strong> {getProgress('Math')}</li>
            <li><strong>Logical Reasoning:</strong> {getProgress('Logical Reasoning')}</li>
          </ul>
        </div>
      )}

      {showMessages && (
        <div className="messages-section">
          <h2>💌 Feedback & Messages</h2>
          <p><strong>👩‍⚕️ Therapist:</strong> Keep up the great work in Math!</p>
          <p><strong>👨‍👩‍👧 Parent:</strong> Proud of your progress, keep practicing Logical Reasoning daily.</p>
          <p><strong>📝 Your Notes:</strong> “I enjoyed the story builder activity today!”</p>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;*/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import { FaBook, FaPuzzlePiece, FaChartLine } from 'react-icons/fa';
import FaceEmotionDetector from '../components/FaceEmotionDetector';

const subjects = ['English', 'Math', 'Logical Reasoning'];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});
  const [showProgress, setShowProgress] = useState(false); // toggle progress tracker

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  useEffect(() => {
    const storedProgress = JSON.parse(localStorage.getItem('progress')) || {};
    const formatted = {};
    subjects.forEach(subject => {
      formatted[subject] = storedProgress[subject]?.length || 0;
    });
    setProgress(formatted);
  }, []);

  return (
    <div className="student-dashboard">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <h1 className="dashboard-heading">Welcome, Learner!</h1>
      <p className="dashboard-subheading">Let's Make Today Count!</p>

      <div className="dashboard-icons">
        <div className="dashboard-card" onClick={() => navigate('/learning-modules')}>
          <FaBook className="icon" />
          <span>Learning Modules</span>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/activities')}>
          <FaPuzzlePiece className="icon" />
          <span>Activities</span>
        </div>

        <div className="dashboard-card" onClick={() => setShowProgress(!showProgress)}>
          <FaChartLine className="icon" />
          <span>Progress Tracker</span>
        </div>
      </div>

      {/* Show progress tracker only if toggled */}
      {showProgress && (
        <div className="progress-section">
          <h2>Progress Tracker</h2>
          {subjects.map(subject => (
            <p key={subject}>
              <strong>{subject}:</strong> {progress[subject] || 0}/3 activities completed
            </p>
          ))}
        </div>
      )}

      {/* Webcam-only view at bottom right */}
      <div className="emotion-detector-box">
        <FaceEmotionDetector />
      </div>
    </div>
  );
};

export default StudentDashboard;
