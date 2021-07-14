import React from "react";
import { useParams } from "react-router-dom";
import { Banner, Modal, Pagination, Search } from "../../components/common";
import { BsImages } from "react-icons/bs";
import "./HistoryAttendance.scss";
import { useState } from "react";
import { Test } from "../../constants/image";
import { useEffect } from "react";
import {
  doGetClassId,
  doSearchInfoAttandanceOneStudentInClass,
} from "../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { doGetInfoAttendanceOneStudentInClass } from "../../redux/action/attendanceAction";
import { ROLE } from "../../constants";
import moment from "moment";

export const HistoryAttendance = () => {
  const { idStudent, idClass } =
    useParams<{ idStudent: string; idClass: string }>();
  const [showModal, setShowModal] = useState(false);
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate]: any = useState("");
  const [time, setTime]: any = useState("");
  const [photoURL, setPhotoURL]: any = useState("");

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const classId = useAppSelector((state) => state.attendance.classId);
  const listAttendance = useAppSelector(
    (state) => state.attendance.listInfoAttandanceOneStudentInClass
  );
  const listSearchAttandance = useAppSelector(
    (state) => state.attendance.listInfoAttandanceOneStudentInClassSearch
  );

  const endOfIndexCurrentPage = postPerPage * currentPage;
  const firstOfIndexCurrentPage = endOfIndexCurrentPage - postPerPage;
  const currenPost = listSearchAttandance?.slice(
    firstOfIndexCurrentPage,
    endOfIndexCurrentPage
  );

  const changePage = (number: number) => {
    setCurrentPage(number);
  };
  // const changeNumber = (number: number) => {
  //   setPostPerPage(number);
  //   setCurrentPage(1);
  // };
  const handleSearch = (value: string) => {
    if (value === "") {
      dispatch(doGetInfoAttendanceOneStudentInClass(idStudent));
    } else {
      let newListInfo = listAttendance.filter((item) => {
        return item.date.search(value) !== -1 || item.time.search(value) !== -1;
      });
      dispatch(doSearchInfoAttandanceOneStudentInClass(newListInfo));
    }
  };

  useEffect(() => {
    if (idClass) {
      dispatch(doGetClassId(idClass));
    }
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      if (currentUser.roles[0].id === ROLE.PARENT) {
        dispatch(doGetInfoAttendanceOneStudentInClass("17521284"));
      } else {
        dispatch(doGetInfoAttendanceOneStudentInClass(idStudent));
      }
    }
  }, [classId, currentUser]);

  // useEffect(()=>{
  //   if(list)
  // },[listSearchAttandance])

  return (
    <div className="HistoryAttendance">
      <Banner
        title={`Lịch sử điểm danh của sinh viên ${idStudent} trong lớp ${idClass}`}
      />
      <div className="HistoryAttendance__content">
        <div className="HistoryAttendance__search">
          <Search
            placeholder="Nhập ngày cần tìm kiếm"
            search={(value) => handleSearch(value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <td>Ngày</td>
              <td>Thời gian điểm danh</td>
              {/* <td>Trạng thái</td> */}
              <td>Xem ảnh</td>
            </tr>
          </thead>
          <tbody>
            {currenPost.map((item) => {
              return (
                <tr>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>
                    <BsImages
                      cursor="pointer"
                      color="red"
                      fontSize={17}
                      onClick={() => {
                        setPhotoURL(item.photoURL);
                        setShowModal(true);
                        setDate(item.date);
                        setTime(item.time);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="list-student__pagination">
        <Pagination
          postPerPage={postPerPage}
          totalPost={listSearchAttandance.length}
          changePage={changePage}
          currentPage={currentPage}
        />
      </div>
      <Modal
        className="HistoryAttendance__show-img"
        isShow={showModal}
        setIsShow={setShowModal}
      >
        <div className="HistoryAttendance__content-modal">
          <span>
            Thời gian: {date} {time}
          </span>
          <img src={photoURL} alt="" />
        </div>
      </Modal>
    </div>
  );
};
