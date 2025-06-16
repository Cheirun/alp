import React from 'react';
import './learn.css';
import englishIcon from '../../assets/icons/english.png';
import mathIcon from '../../assets/icons/math.png';
import logicIcon from '../../assets/icons/logical.png'; // fixed line
import { useNavigate } from 'react-router-dom';

const Learn = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: 'English', icon: englishIcon, path: '/english' },
    { name: 'Mathematics', icon: mathIcon, path: '/mathematics' },
    { name: 'Logical Reasoning', icon: logicIcon, path: '/logical' }
  ];

  return (
    <div className="learn-container">
      <h2>Choose a Subject</h2>
      <div className="subject-grid">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="subject-card"
            onClick={() => navigate(subject.path)}
          >
            <img src={subject.icon} alt={subject.name} className="subject-icon" />
            <p>{subject.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
