import React from "react";
import "./childDashboard.css";
import contactIcon from "../../assets/icons/contact.png";

const ContactCard = () => {
  return (
    <div className="card">
      <img src={contactIcon} alt="Contact" />
      <h3>Contact Therapist</h3>
    </div>
  );
};

export default ContactCard;
