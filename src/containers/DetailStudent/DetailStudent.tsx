import React, { useEffect, useState } from "react";
import { ImageUploadInput, ScheduleStudent } from "../../components";
// import TestAvatar from "../../assets/images/cong-nghe-nhan-dien-khuon-mat-1.jpg";
import "./DetailStudent.scss";
import { Banner, Button, Dropdown } from "../../components/common";
import { useHistory, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { doGetOneStudent, doGetTimetableStudent } from "../../redux/action";
import moment from "moment";
import { Color } from "../../constants";

export const DetailStudent = () => {
  const imageOnChange = (f: File) => {
    // formik.setFieldValue('groupCoverImage', f);
  };
  const { idStudent } = useParams<{ idStudent: string }>();
  const [year, setYear] = useState(2020);
  const [semester, setSemester] = useState(1);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const oneStudent = useAppSelector((state) => state.student.oneStudent);
  const timetableStudent = useAppSelector(
    (state) => state.student.timeTableStudent
  );
  const listSemester = [
    { name: "Học kì 1", id: 1 },
    { name: "Học kì 2", id: 2 },
  ];
  const listYear = [
    { name: "2018-2019", id: 2018 },
    { name: "2019-2020", id: 2019 },
    { name: "2020-2021", id: 2020 },
  ];
  const handleViewListTimeTable = () => {
    dispatch(
      doGetTimetableStudent({
        userId: idStudent,
        year: year,
        semester: semester,
      })
    );
  };
  useEffect(() => {
    dispatch(doGetOneStudent(idStudent));
    dispatch(
      doGetTimetableStudent({
        userId: idStudent,
        year: 2020,
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
      <div className="detailStudent__timetable">
        <div className="detailStudent__header">
          <div className="detailStudent__semester">
            <span>Học kì</span>
            <Dropdown
              placeholder="Chọn học kì"
              data={listSemester}
              className="detailStudent__dropdown"
              onChange={(value: any) => setSemester(value.id)}
              defaultValue={{ id: 1, name: "Học kì 1" }}
            />
          </div>
          <div className="detailStudent__year">
            <span>Năm học</span>
            <Dropdown
              placeholder="Chọn năm học"
              data={listYear}
              className="detailStudent__dropdown"
              onChange={(value: any) => setYear(value.id)}
              defaultValue={{ id: 2020, name: "2020-2021" }}
            />
          </div>
          <Button
            color={Color.Blue}
            className="detailStudent__btn"
            onClick={() => handleViewListTimeTable()}
          >
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
