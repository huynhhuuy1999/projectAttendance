import moment from "moment";
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useHistory } from "react-router";
import "./TableTeacher.scss";

export const TableTeacher: React.FC<ITableTeacher> = ({ data, showModal }) => {
  const history = useHistory();
  return (
    <table className="table-teacher">
      <thead>
        <tr>
          <th>MSSV</th>
          <th>Họ tên</th>
          <th>Ngày sinh</th>
          <th>Số điện thoại</th>
          <th>Chi tiết</th>
          <th>Xóa</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.fullName}</td>
              <td>{moment(item.birthday).format("DD/MM/YYYY")}</td>
              <td>{item.phone}</td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => history.push(`/detailteacher/${item.id}`)}
              >
                Chi tiết
              </td>
              <td>
                <IoMdCloseCircleOutline
                  size={24}
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => showModal(item.id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
