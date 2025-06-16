import React from "react";
import { useNavigate } from "react-router-dom";
import bookIcon from "../../assets/icons/book.png";
import "./childDashboard.css";

const LearnCard = () => {
  const navigate = useNavigate();
  return (
    <div className="card learn-card" onClick={() => navigate("/learn")}>
      <img src={bookIcon} alt="Learn" />
      <h3>Learn</h3>
    </div>
  );
};

export default LearnCard;

