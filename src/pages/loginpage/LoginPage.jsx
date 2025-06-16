// File: src/pages/loginpage/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userType === 'child') {
      navigate('/dashboard'); // ✅ Corrected path
    } else if (userType === 'therapist') {
      alert('Therapist dashboard is not built yet.');
    } else {
      alert('Please select a user type.');
    }
  };

  return (
    <div className="page-container">
      <h1>Welcome to ALP App</h1>
      <p>Select user type to continue:</p>
      <div>
        <label>
          <input
            type="radio"
            name="userType"
            value="child"
            onChange={(e) => setUserType(e.target.value)}
          />
          Child
        </label>
        <label style={{ marginLeft: '20px' }}>
          <input
            type="radio"
            name="userType"
            value="therapist"
            onChange={(e) => setUserType(e.target.value)}
          />
          Therapist
        </label>
      </div>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
