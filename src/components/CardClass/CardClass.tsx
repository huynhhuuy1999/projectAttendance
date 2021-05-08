import React from "react";
import "./CardClass.scss";
export const CardClass: React.FC<ICardClass> = ({
  endTime,
  idClass,
  nameClass,
  numberStudent,
  room,
  startTime,
  nameTeacher,
}) => {
  return (
    <div className="cardclass">
      <span className="bold">{idClass}</span>
      <span>Sỉ số: {numberStudent}</span>
      <span>{nameClass}</span>
      <span className="bold">{nameTeacher}</span>
      <span>{room}</span>
      <span>BĐ:{startTime}</span>
      <span>KT:{endTime}</span>
    </div>
  );
};
