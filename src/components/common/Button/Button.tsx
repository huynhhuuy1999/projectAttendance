import React from "react";
import "./Button.scss";

export const Button: React.FC<IButton> = ({
  children,
  className,
  type,
  isSecondaryBtn,
  onClick,
  isThirBtn,
  isOrderBtn,
}) => {
  return (
    <button
      className={`btn ${className}  ${
        isSecondaryBtn
          ? "btn__secondary"
          : isThirBtn
          ? "btn__thir"
          : isOrderBtn
          ? "btn__order"
          : ""
      } `}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
