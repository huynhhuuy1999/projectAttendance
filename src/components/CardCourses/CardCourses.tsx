import React from "react";
import "./CardCourses.scss";

export const CardCourses: React.FC<ICardCourses> = ({
  idCourse,
  nameCourse,
  numberClass,
}) => {
  return (
    <div className="card-courses">
      <div className="card-courses__id card-courses--bold">({idCourse})</div>
      <div className="card-courses__name card-courses--margin-top">
        {nameCourse}
      </div>
      <div className="card-courses__number card-courses--margin-top card-courses--bold">
        Số lớp: {numberClass}
      </div>
      <div className="card-courses__detail card-courses--margin-top">
        Chi tiết
      </div>
    </div>
  );
};
