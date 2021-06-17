import React from "react";
import "./Button.scss";

export const Button: React.FC<IButton> = ({
  children,
  className,
  type,
  onClick,
  width,
  height,
  marginLeft,
  marginRight,
  margin,
  color,
  textColor,
  marginTop,
  marginBottom,
}) => {
  return (
    <button
      className={`btn ${className}`}
      type={type}
      onClick={onClick}
      style={{
        width,
        height,
        margin,
        marginLeft,
        marginRight,
        backgroundColor: color,
        color: textColor,
        marginTop,
        marginBottom,
      }}
    >
      {children}
    </button>
  );
};
