import React from "react";
import "../button/button.css";

function Button({ title, size, onClick }) {
  const buttonClassName = size === "high" ? "edit-button-high" : "edit-button";

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={buttonClassName} onClick={handleButtonClick}>
      {title}
    </button>
  );
}

export default Button;
