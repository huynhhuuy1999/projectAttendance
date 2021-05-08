import React from "react";
import "./Banner.scss";

export const Banner: React.FC<IBanner> = ({ title }) => {
  return <div className="banner">{title}</div>;
};
