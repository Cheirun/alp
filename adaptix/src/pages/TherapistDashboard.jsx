import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TherapistDashboard.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const TherapistDashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const toggleMode = () => setDarkMode(!darkMode);

  // Fetch all users on mount
  useEffect(() => {
    const fetchUsersAndProgress = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/users`);
        const usersData = await res.json();
        setUsers(usersData);
        // Fetch progress for each user
        const progressResults = {};
        for (const user of usersData) {
          if (user._id) {
            try {
              const progRes = await fetch(`${API_BASE_URL}/api/progress/${user._id}`);
              const progData = await progRes.json();
              progressResults[user._id] = progData;
            } catch (err) {
              progressResults[user._id] = { error: 'No progress data' };
            }
          }
        }
        setProgressData(progressResults);
      } catch (err) {
        setError('Failed to fetch users or progress');
      } finally {
        setLoading(false);
      }
    };
    fetchUsersAndProgress();
  }, []);

  return (
    <div className={`therapist-dashboard ${darkMode ? 'dark' : 'light'}`}>
      <header className="dashboard-header">
        <h1>Welcome, Therapist</h1>
        <div>
          <button onClick={toggleMode}>
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <section className="assigned-children">
        <h2 style={{ textAlign: 'center', margin: '32px 0 24px', fontSize: '2rem', color: '#6a0dad' }}>Student Overview</h2>
        {loading ? (
          <p>Loading students...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : users.filter(u => u.role === 'student').length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="student-cards-container">
            {users.filter(user => user.role === 'student').map((user) => {
              const prog = progressData[user._id];
              let accuracyColor = '#888';
              if (prog && !prog.error) {
                const acc = parseFloat(prog.accuracy);
                if (acc >= 80) accuracyColor = '#4caf50';
                else if (acc >= 50) accuracyColor = '#ff9800';
                else accuracyColor = '#f44336';
              }
              return (
                <div key={user._id} className="student-card">
                  <div className="student-card-header">
                    <span className="student-avatar">👦</span>
                    <span className="student-name">{user.name}</span>
                  </div>
                  <div className="student-info">
                    <div><strong>Email:</strong> {user.email}</div>
                    <div><strong>Level:</strong> {user.currentLevel}</div>
                    <div><strong>Topic:</strong> {user.currentTopic}</div>
                  </div>
                  <div className="student-progress">
                    <div><strong>Attempts:</strong> {prog && !prog.error ? prog.totalAttempts : '-'}</div>
                    <div><strong>Correct:</strong> {prog && !prog.error ? prog.correctAnswers : '-'}</div>
                    <div><strong>Accuracy:</strong> <span style={{ color: accuracyColor, fontWeight: 600 }}>{prog && !prog.error ? `${prog.accuracy}%` : '-'}</span></div>
                    <div><strong>Emotions:</strong> <span style={{ fontSize: '0.95em' }}>{prog && !prog.error && prog.emotionCounts ? Object.entries(prog.emotionCounts).map(([emo, count]) => `${emo}: ${count}`).join(', ') : '-'}</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default TherapistDashboard;
