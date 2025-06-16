import React from "react";
import "./childDashboard.css";
import progressIcon from "../../assets/icons/progress.png";

const ProgressCard = () => {
  return (
    <div className="card">
      <img src={progressIcon} alt="Progress" />
      <h3>Progress</h3>
    </div>
  );
};

export default ProgressCard;

