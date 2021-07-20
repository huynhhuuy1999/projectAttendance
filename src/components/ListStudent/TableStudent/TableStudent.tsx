import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "./TableStudent.scss";
import { useAppDispatch } from "../../../redux/store";
import { doAttendanceStudent } from "../../../redux/action/attendanceAction";
import { LoaderModal, Modal, NotiFail, NotiSuccess } from "../../common";
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Color } from "../../../constants";

export const TableStudent: React.FC<ITableStudent> = ({
  data,
  showModal,
  isAttendance,
  idClass,
}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [loaderModal, setLoadModal] = useState(false);
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [isShowModalFail, setIsShowModalFail] = useState(false);
  const handleAttendance = (idStudent: string) => {
    setLoadModal(true);
    dispatch(
      doAttendanceStudent({
        student: {
          id: idStudent,
        },
        clazz: {
          id: idClass,
        },
      })
    )
      // .then(unwrapResult)
      .then((res) => {
        setLoadModal(false);
        setIsShowModalSuccess(true);
      });
    // .catch((err) => {
    //   setLoadModal(false);
    //   setIsShowModalFail(true);
    // });
  };
  return (
    <>
      <table className="table-student">
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Ngày sinh</th>
            <th>Số điện thoại</th>
            {/* <th>Số ngày vắng</th> */}
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
                {/* <td>2</td> */}
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
      <LoaderModal color={Color.Blue} isShow={loaderModal} />
      <NotiSuccess
        isShow={isShowModalSuccess}
        setIsShow={setIsShowModalSuccess}
        message="Điểm danh thành công"
        onClick={() => setIsShowModalSuccess(false)}
      />
      <NotiFail
        isShow={isShowModalFail}
        setIsShow={setIsShowModalFail}
        message="Sinh viên đã điểm danh"
        onClick={() => setIsShowModalFail(false)}
      />
    </>
  );
};
