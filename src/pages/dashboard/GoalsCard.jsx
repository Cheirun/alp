import React from "react";
import "./childDashboard.css";
import goalsIcon from "../../assets/icons/goals.png";

const GoalsCard = () => {
  return (
    <div className="card">
      <img src={goalsIcon} alt="Goals" />
      <h3>Goals</h3>
    </div>
  );
};

export default GoalsCard;
