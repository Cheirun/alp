import React from 'react';
import './childDashboard.css';
import Sidebar from './Sidebar';
import learnIcon from '../../assets/icons/book.png';
import gamesIcon from '../../assets/icons/games.png';
import goalsIcon from '../../assets/icons/goals.png';
import progressIcon from '../../assets/icons/progress.png';
import settingsIcon from '../../assets/icons/settings.png';
import contactIcon from '../../assets/icons/contact.png';
import { useNavigate } from 'react-router-dom';

const ChildDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    { icon: learnIcon, title: 'Learn', path: '/learn' },
    { icon: gamesIcon, title: 'Games', path: '/games' },
    { icon: goalsIcon, title: 'Goals', path: '/goals' },
    { icon: progressIcon, title: 'Progress', path: '/progress' },
    { icon: settingsIcon, title: 'Settings', path: '/settings' },
    { icon: contactIcon, title: 'Contact Therapist', path: '/contact' },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <div className="dashboard-grid">
          {cards.map((card, index) => (
            <div
              key={index}
              className="dashboard-card"
              onClick={() => navigate(card.path)}
            >
              <img src={card.icon} alt={card.title} className="dashboard-icon" />
              <p className="dashboard-title">{card.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;
