import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();

  // Dummy user data
  const users = {
    Student: { username: "student1", password: "studentpass" },
    Parent: { username: "parent1", password: "parentpass" },
    Therapist: { username: "therapist1", password: "therapypass" },
    "Educational Organization": { username: "org1", password: "orgpass" }
  };

  const handleLogin = (e) => {
  e.preventDefault();

  const user = users[role];

  if (user && user.username === username && user.password === password) {
    let route = '';
    if (role === 'Student') route = '/student';
    else if (role === 'Parent') route = '/parent';
    else if (role === 'Therapist') route = '/therapist';
    else if (role === 'Educational Organization') route = '/organization';

    alert(`Login successful as ${role}`);
    navigate(route);
  } else {
    alert("Invalid credentials!");
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Role:</label><br />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Student">Student</option>
            <option value="Parent">Parent</option>
            <option value="Therapist">Therapist</option>
            <option value="Educational Organization">Educational Organization</option>
          </select>
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;