import React from "react";
import "./Loader.scss";

export const Loader: React.FC<ILoader> = ({
  className,
  color,
  marginTop,
  height,
  isSmall,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height,
      }}
    >
      <div
        className={`loader ${
          className ? className : isSmall ? "loader__small" : ""
        }`}
        style={{ borderLeftColor: color, borderTopColor: color, marginTop }}
      />
    </div>
  );
};
