import React from "react";
import "./TableStudent.scss";

export const TableStudent: React.FC<ITableStudent> = ({ data }) => {
  return (
    <table className="table-student">
      <thead>
        <tr>
          <th>MSSV</th>
          <th>Họ tên</th>
          <th>Ngày sinh</th>
          <th>Số điện thoại</th>
          <th>Số ngày vắng</th>
          <th>Số ngày trễ</th>
          <th>Chi tiết</th>
        </tr>
      </thead>
      <tbody>{data}</tbody>
    </table>
  );
};
