import React from "react";
import "../button/button.css";

function Button({ title, size }) {
  const buttonClassName = size === "high" ? "edit-button-high" : "edit-button";

  return <button className={buttonClassName}>{title}</button>;
}

export default Button;
