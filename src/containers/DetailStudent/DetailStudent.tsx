import React, { useEffect, useState } from "react";
import { ImageUploadInput, ScheduleStudent } from "../../components";
// import TestAvatar from "../../assets/images/cong-nghe-nhan-dien-khuon-mat-1.jpg";
import "./DetailStudent.scss";
import { Banner, Button, Dropdown } from "../../components/common";
import { useHistory, useParams } from "react-router";
import { useAppDispatch } from "../../redux/store";
import { doGetOneStudent, doGetTimetableStudent } from "../../redux/action";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import moment from "moment";
import { Color } from "../../constants";

export const DetailStudent = () => {
  const imageOnChange = (f: File) => {
    // formik.setFieldValue('groupCoverImage', f);
  };
  const { idStudent } = useParams<{ idStudent: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const oneStudent = useSelector(
    (state: RootState) => state.student.oneStudent
  );
  const timetableStudent = useSelector(
    (state: RootState) => state.student.timeTableStudent
  );
  const listSemester = [
    { name: "Học kì 1", id: 1 },
    { name: "Học kì 2", id: 2 },
  ];
  const listYear = [
    { name: "2019-2020", id: 1 },
    { name: "2020-2021", id: 2 },
  ];
  useEffect(() => {
    dispatch(doGetOneStudent(idStudent));
    dispatch(
      doGetTimetableStudent({
        userId: "17521224",
        year: 2021,
        semester: 1,
      })
    );
  }, []);
  return (
    <div className="detailStudent">
      <Banner title="Chi tiết sinh viên" />
      <div className="detailStudent__content">
        <div className="detailStudent__avatar">
          <ImageUploadInput
            avatar="https://picsum.photos/200/300"
            onChange={imageOnChange}
          />
        </div>
        <div className="detailStudent__infor-right">
          <div className="detailStudent__info">
            <span className="detailStudent__label">MSSV:</span>
            <span>{oneStudent.id}</span>
            <span className="detailStudent__label">Họ tên:</span>
            <span>{oneStudent.fullName}</span>
            <span className="detailStudent__label">Ngày sinh:</span>
            <span>{moment(oneStudent.birthday).format("DD/MM/YYYY")}</span>
            <span className="detailStudent__label">Số điện thoại:</span>
            <span>{oneStudent.phone}</span>
            <span className="detailStudent__label">Email:</span>
            <span className="detailStudent__info-address">
              {oneStudent.email}
            </span>
            <span className="detailStudent__label">Địa chỉ:</span>
            <span className="detailStudent__info-address">
              {oneStudent.address}
            </span>
            <span className="detailStudent__label">Số buổi vắng:</span>
            <span>2</span>
            <span className="detailStudent__label">Số buổi trễ:</span>
            <span>5</span>
            <span className="detailStudent__label">Họ tên bố</span>
            <span>Taylor Swat</span>
            <span className="detailStudent__label">Số điện thoại:</span>
            <span>999999999</span>
            <span className="detailStudent__label">Họ tên mẹ:</span>
            <span>Nguyễn Thị Swoft</span>
            <span className="detailStudent__label">Số điện thoại:</span>
            <span>888888888</span>
          </div>
          <div className="detailStudent__group-btn">
            <Button color={Color.Blue}>Liên hệ phụ huynh</Button>
            <Button
              color={Color.Blue}
              className="detailStudent__btn--margin-left"
              onClick={() => history.push(`/updatestudent/${idStudent}`)}
            >
              Cập nhật thông tin
            </Button>
            <Button
              color={Color.Blue}
              className="detailStudent__btn--margin-left"
              onClick={() => history.push(`/listImageAttendance/${idStudent}`)}
            >
              Ảnh nhận diện mặt
            </Button>
          </div>
        </div>
      </div>
      <h3 className="detailStudent__title-timetable">Thời khóa biểu</h3>
      {/* <hr style={{ color: "#f63e62" }} /> */}
      <div className="detailStudent__timetable">
        <div className="detailStudent__header">
          <div className="detailStudent__semester">
            <span>Học kì</span>
            <Dropdown
              placeholder="Chọn học kì"
              data={listSemester}
              className="detailStudent__dropdown"
              onChange={(value: any) => console.log(value)}
            />
          </div>
          <div className="detailStudent__year">
            <span>Năm học</span>
            <Dropdown
              placeholder="Chọn năm học"
              data={listYear}
              className="detailStudent__dropdown"
              onChange={(value: any) => console.log(value)}
            />
          </div>
          <Button color={Color.Blue} className="detailStudent__btn">
            Xem
          </Button>
        </div>
      </div>
      <div className="detailStudent__schedule">
        <ScheduleStudent data={timetableStudent} />
      </div>
    </div>
  );
};
