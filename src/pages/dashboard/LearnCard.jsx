import React from "react";
import { useNavigate } from "react-router-dom";
import bookIcon from "../../assets/icons/book.png";

const LearnCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/learn");
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={bookIcon} alt="Learn" className="card-icon" />
      <h3>Learn</h3>
    </div>
  );
};

export default LearnCard;


