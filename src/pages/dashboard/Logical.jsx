import React from "react";
import "./learn.css";
import logicalIcon from "../../assets/icons/logical.png";

const Logical = () => {
  return (
    <div className="subject-page">
      <img src={logicalIcon} alt="Logical Reasoning" className="subject-icon" />
      <h2>Logical Reasoning</h2>
      <p>Sharpen your mind with fun puzzles!</p>
    </div>
  );
};

export default Logical;
