import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { BsImages } from "react-icons/bs";
import { useHistory, useParams } from "react-router-dom";
import { Banner, Button, Modal, Search } from "../../components/common";
import { Color } from "../../constants";
import { doGetInfoAttendanceInClass } from "../../redux/action/attendanceAction";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./ListAttendanceClass.scss";

export const ListAttendanceClass = () => {
  const { idClass } = useParams<{ idClass: string }>();

  const [showModal, setShowModal] = useState(false);
  const [time, setTime]: any = useState("");
  const [photoURL, setPhotoURL]: any = useState("");

  const dispatch = useAppDispatch();
  const history = useHistory();

  const listAttandenceClass = useAppSelector(
    (state) => state.attendance.listInfoAttendanceInClass
  );

  const handleSearch = (value: string) => {
    // if (value === "") {
    //   dispatch(doGetInfoAttendanceOneStudentInClass(idStudent));
    // } else {
    //   let newListInfo = listAttendance.filter((item) => {
    //     return item.date.search(value) !== -1 || item.time.search(value) !== -1;
    //   });
    //   dispatch(doSearchInfoAttandanceOneStudentInClass(newListInfo));
    // }
  };
  //   console.log("listAttandenceClass", listAttandenceClass);
  useEffect(() => {
    dispatch(doGetInfoAttendanceInClass(idClass));
  }, []);
  return (
    <div className="ListAttendanceClass">
      <Banner title={`Lịch sử điểm danh của lớp ${idClass}`} />
      <div className="ListAttendanceClass__content">
        <Button
          color={Color.Green}
          marginBottom={10}
          onClick={() => history.push("/statisticalClass/" + idClass)}
        >
          Thống kê lịch sử điểm danh
        </Button>
        <div className="ListAttendanceClass__search">
          <Search
            placeholder="Nhập ngày cần tìm kiếm"
            search={(value) => handleSearch(value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <td>Ngày</td>
              <td>Họ tên</td>
              <td>Thời gian điểm danh</td>
              <td>Xem ảnh</td>
            </tr>
          </thead>
          <tbody>
            {listAttandenceClass.map((item) => {
              return (
                <tr>
                  <td>{moment(item.time).format("DD-MM-YYYY")}</td>
                  <td>{item.student?.fullName}</td>
                  <td>
                    {item.status
                      ? moment(item.time).format("hh:mm:ss")
                      : "Vắng"}
                  </td>
                  <td>
                    {item.status ? (
                      <BsImages
                        cursor="pointer"
                        color="red"
                        fontSize={17}
                        onClick={() => {
                          setPhotoURL(item?.photoUrl);
                          setShowModal(true);
                          setTime(item.time);
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal
        className="ListAttendanceClass__show-img"
        isShow={showModal}
        setIsShow={setShowModal}
      >
        <div className="ListAttendanceClass__content-modal">
          <span>
            {`Thời gian: ${moment(time).format("DD-MM-YYYY hh:mm:ss")}`}
          </span>
          <img src={photoURL} alt="" />
        </div>
      </Modal>
    </div>
  );
};
