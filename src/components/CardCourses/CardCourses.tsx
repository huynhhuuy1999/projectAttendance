import React, { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { ROLE } from "../../constants";
import { EditSvg } from "../../constants/image";
import "./CardCourses.scss";

export const CardCourses: React.FC<ICardCourses> = ({
  idCourse,
  nameCourse,
  numberClass,
  showModal,
  showModalEdit,
  role,
}) => {
  const history = useHistory();
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div className="card-courses">
      {role === ROLE.ADMIN ? (
        <>
          <img
            src={EditSvg}
            alt=""
            className="card-courses__icon"
            onClick={() => {
              if (showModalEdit) showModalEdit(idCourse, nameCourse);
            }}
          />
          <AiTwotoneDelete
            color="#dd1a35"
            size={20}
            className="card-courses__icon-trash"
            onClick={() => {
              if (showModal) {
                showModal(idCourse);
              }
            }}
          />
        </>
      ) : null}

      <div className="card-courses__id card-courses--bold">({idCourse})</div>
      <div className="card-courses__name card-courses--margin-top">
        {nameCourse}
      </div>
      {/* <div className="card-courses__number card-courses--margin-top card-courses--bold">
        Số lớp: {numberClass}
      </div> */}
      <div
        className="card-courses__detail card-courses--margin-top"
        onClick={() => history.push(`/listclass/${idCourse}`)}
      >
        Xem danh sách lớp
      </div>
    </div>
  );
};
