// Importing React library
import React from 'react';

// Importing the CSS file that styles the child dashboard
import './childDashboard.css';

// Importing the Sidebar component which appears on the left side of the dashboard
import Sidebar from './Sidebar';

// Importing icons used in the dashboard cards
import learnIcon from '../../assets/icons/book.png';
import goalsIcon from '../../assets/icons/goals.png';
import progressIcon from '../../assets/icons/progress.png';
import settingsIcon from '../../assets/icons/settings.png';
import contactIcon from '../../assets/icons/contact.png';

// Importing navigation hook from react-router-dom to enable page redirection
import { useNavigate } from 'react-router-dom';

// Main ChildDashboard functional component
const ChildDashboard = () => {
  // useNavigate hook allows us to programmatically navigate between routes
  const navigate = useNavigate();

  // Array containing all dashboard cards with their respective icon, title, and navigation path
  const cards = [
    { icon: learnIcon, title: 'Learn', path: '/learn' },
    { icon: goalsIcon, title: 'Goals', path: '/goals' },
    { icon: progressIcon, title: 'Progress', path: '/progress' },
    { icon: settingsIcon, title: 'Settings', path: '/settings' },
    { icon: contactIcon, title: 'Contact Therapist', path: '/contact' },
  ];

  return (
    <div className="dashboard-container">
      {/* Renders the Sidebar component on the left */}
      <Sidebar />

      {/* Main content section (right side) */}
      <div className="dashboard-content">
        <div className="dashboard-main">
          
          {/* Heading shown at the top of the dashboard */}
          <h1 className="dashboard-heading">Welcome Back, Superstar! 🌈</h1>

          {/* Grid layout that displays all the dashboard cards */}
          <div className="dashboard-grid">
            {/* Iterates over the cards array and renders each dashboard card */}
            {cards.map((card, index) => (
              <div
                key={index}
                className="dashboard-card"
                onClick={() => navigate(card.path)} // Navigate to the card's path on click
              >
                {/* Icon of the card */}
                <img src={card.icon} alt={card.title} className="dashboard-icon" />
                {/* Title of the card */}
                <p className="dashboard-title">{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the ChildDashboard component to use it in routing
export default ChildDashboard;
