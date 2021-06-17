import React from "react";
import { Banner } from "../../components/common";
import "./ListAttendance.scss";

export const ListAttendance = () => {
  // mã số
  // tên
  // lớp
  // thời gian
  // trạng thái
  return (
    <div className="list-attendance">
      <Banner title="Lịch sử điểm danh" />
      <div className="list-attendance__cover">
        <div>Mã sinh viên</div>
        <div>Họ và tên</div>
        <div>Lớp</div>
        <div>Thời gian</div>
        <div>Trạng thái</div>
      </div>
    </div>
  );
};
