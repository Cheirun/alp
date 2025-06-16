import React from "react";
import "./childDashboard.css";
import settingsIcon from "../../assets/icons/settings.png";

const SettingsCard = () => {
  return (
    <div className="card">
      <img src={settingsIcon} alt="Settings" />
      <h3>Settings</h3>
    </div>
  );
};

export default SettingsCard;
