import React, { useState } from "react";
import { useHistory } from "react-router";
import { EditSvg } from "../../constants/image";
import "./CardClass.scss";
import { AiTwotoneDelete } from "react-icons/ai";
import { ROLE } from "../../constants";
export const CardClass: React.FC<ICardClass> = ({
  endTime,
  idClass,
  nameClass,
  numberStudent,
  room,
  startTime,
  nameTeacher,
  role,
  showModal,
  viewListStudent,
}) => {
  const history = useHistory();
  return (
    <div className="cardclass">
      {role === ROLE.ADMIN ? (
        <>
          <img
            src={EditSvg}
            alt=""
            className="cardclass__icon"
            onClick={() => history.push(`/createclass/${idClass}`)}
          />
          <AiTwotoneDelete
            color="#dd1a35"
            size={20}
            className="cardclass__icon-trash"
            onClick={() => {
              if (showModal) showModal(idClass);
            }}
          />
        </>
      ) : null}

      <span className="bold">{idClass}</span>
      <span>Sỉ số: {numberStudent}</span>
      <span>{nameClass}</span>
      <span className="bold">{nameTeacher}</span>
      <span>{room}</span>
      <span>BĐ:{startTime}</span>
      <span>KT:{endTime}</span>
      {viewListStudent ? (
        <span
          style={{ cursor: "pointer", color: "#009999" }}
          onClick={() => history.push(`/liststudent/${idClass}`)}
        >
          Xem chi tiết
        </span>
      ) : null}
    </div>
  );
};
