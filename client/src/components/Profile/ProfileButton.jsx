import React from "react";
import "./profileButton.scss";

const ProfileButton = ({ label, handleClick, svgPath, onClick, className, disabled }) => {
  return (
    <button
      className={`cssbuttons-io-button ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      <div className="icon">
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d={svgPath} fill="currentColor"></path>
        </svg>
      </div>
    </button>
  );
};

export default ProfileButton;
