import React from "react";
import "./childDashboard.css";
import gamesIcon from "../../assets/icons/games.png";

const GamesCard = () => {
  return (
    <div className="card">
      <img src={gamesIcon} alt="Games" />
      <h3>Games</h3>
    </div>
  );
};

export default GamesCard;

