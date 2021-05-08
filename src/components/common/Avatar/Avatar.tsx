import React from "react";
import "./Avatar.scss";
export const Avatar: React.FC<IAvatar> = ({ image, className }) => {
  return <img src={image} alt="" className={`avatar ${className}`} />;
};
