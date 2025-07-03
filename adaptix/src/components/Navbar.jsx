import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  // Only show navbar if user is logged in
  if (!user) {
    return null;
  }

  // Determine dashboard path based on user role
  let dashboardPath = '/dashboard/student';
  switch (user.role) {
    case 'parent':
      dashboardPath = '/dashboard/parent';
      break;
    case 'therapist':
      dashboardPath = '/dashboard/therapist';
      break;
    case 'organization':
      dashboardPath = '/dashboard/organization';
      break;
    default:
      dashboardPath = '/dashboard/student';
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <div className="navbar-logo" onClick={() => navigate('/')}>ADAPTIX</div>
      </div>
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>Home</NavLink>
        <NavLink to="/activities" className={({ isActive }) => isActive ? 'active' : ''}>Activities</NavLink>
        <NavLink to="/learning-modules" className={({ isActive }) => isActive ? 'active' : ''}>Learning Modules</NavLink>
        <NavLink to={dashboardPath} className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
      </div>
    </nav>
  );
};

export default Navbar; 