import React from "react";
import "./learn.css";
import mathIcon from "../../assets/icons/math.png";

const Mathematics = () => {
  return (
    <div className="subject-page">
      <img src={mathIcon} alt="Mathematics" className="subject-icon" />
      <h2>Mathematics</h2>
      <p>Let’s solve some math problems!</p>
    </div>
  );
};

export default Mathematics;
