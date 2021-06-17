import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "./TableStudent.scss";
import { useAppDispatch } from "../../../redux/store";
import { doAttendanceStudent } from "../../../redux/action/attendanceAction";

export const TableStudent: React.FC<ITableStudent> = ({
  data,
  showModal,
  isAttendance,
  idClass,
}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const handleAttendance = (idStudent: string) => {
    dispatch(
      doAttendanceStudent({
        student: {
          id: idStudent,
        },
        clazz: {
          id: idClass,
        },
      })
    );
  };
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
          <th>Xóa</th>
          {isAttendance ? <th>Điểm danh</th> : null}
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
              <td>2</td>
              <td>5</td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => history.push(`/detailstudent/${item.id}`)}
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
              {isAttendance ? (
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => handleAttendance(item.id)}
                >
                  Điểm danh
                </td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
