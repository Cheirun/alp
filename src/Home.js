import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to Adaptive Learning</h1>

      <nav>
        <Link to="/learn">Go to Learning Path</Link><br />
        <Link to="/game">Play a Game</Link>
      </nav>
    </div>
  );
}

export default Home;