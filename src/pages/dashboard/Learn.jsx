import React from "react";
import { useNavigate } from "react-router-dom";
import englishIcon from "../../assets/icons/english.png";
import mathIcon from "../../assets/icons/math.png";
import logicalIcon from "../../assets/icons/logical.png";
import "./learn.css";

const Learn = () => {
  const navigate = useNavigate();

  return (
    <div className="learn-page">
      <h2>Select a Subject</h2>
      <div className="cards-grid">
        <div className="card" onClick={() => navigate("/english")}>
          <img src={englishIcon} alt="English" className="card-icon" />
          <h3>English</h3>
        </div>
        <div className="card" onClick={() => navigate("/mathematics")}>
          <img src={mathIcon} alt="Mathematics" className="card-icon" />
          <h3>Mathematics</h3>
        </div>
        <div className="card" onClick={() => navigate("/logical")}>
          <img src={logicalIcon} alt="Logical" className="card-icon" />
          <h3>Logical</h3>
        </div>
      </div>
    </div>
  );
};

export default Learn;
