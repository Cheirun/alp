import React, { useState } from 'react';
import './sidebar.css';
import learnIcon from '../../assets/icons/book.png';
import gamesIcon from '../../assets/icons/games.png';
import goalsIcon from '../../assets/icons/goals.png';
import progressIcon from '../../assets/icons/progress.png';
import settingsIcon from '../../assets/icons/settings.png';
import contactIcon from '../../assets/icons/contact.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '<' : '>'}
      </button>
      <ul className="sidebar-list">
        <li><Link to="/dashboard"><img src={learnIcon} alt="Learn" /> {isOpen && "Learn"}</Link></li>
        <li><Link to="/games"><img src={gamesIcon} alt="Games" /> {isOpen && "Games"}</Link></li>
        <li><Link to="/goals"><img src={goalsIcon} alt="Goals" /> {isOpen && "Goals"}</Link></li>
        <li><Link to="/progress"><img src={progressIcon} alt="Progress" /> {isOpen && "Progress"}</Link></li>
        <li><Link to="/settings"><img src={settingsIcon} alt="Settings" /> {isOpen && "Settings"}</Link></li>
        <li><Link to="/contact"><img src={contactIcon} alt="Contact" /> {isOpen && "Contact"}</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
