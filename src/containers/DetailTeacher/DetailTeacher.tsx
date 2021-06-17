import React, { useEffect } from "react";
import { ImageUploadInput } from "../../components";
import TestAvatar from "../../assets/images/cong-nghe-nhan-dien-khuon-mat-1.jpg";
import "./DetailTeacher.scss";
import { Banner, Button } from "../../components/common";
import { useHistory, useParams } from "react-router";
import { useAppDispatch } from "../../redux/store";
import { doGetOneTeacher } from "../../redux/action";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import moment from "moment";
import { Color } from "../../constants";

export const DetailTeacher = () => {
  const imageOnChange = (f: File) => {
    // formik.setFieldValue('groupCoverImage', f);
  };
  const { idTeacher } = useParams<{ idTeacher: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const oneTeacher = useSelector(
    (state: RootState) => state.teacher.oneTeacher
  );
  //   const timetableStudent = useSelector(
  //     (state: RootState) => state.student.timeTableStudent
  //   );
  //   const listSemester = [
  //     { label: "Học kì 1", value: 1 },
  //     { label: "Học kì 2", value: 2 },
  //   ];
  //   const listYear = [
  //     { label: "2019-2020", value: 1 },
  //     { label: "2020-2021", value: 2 },
  //   ];
  useEffect(() => {
    dispatch(doGetOneTeacher(idTeacher));
    // dispatch(
    //   doGetTimetableStudent({
    //     userId: "17521284",
    //     year: 2020,
    //     semester: 2,
    //   })
    // );
  }, []);
  return (
    <div className="detailTeacher">
      <Banner title="Chi tiết giảng viên" />
      <div className="detailTeacher__content">
        <div className="detailTeacher__avatar">
          <ImageUploadInput avatar={TestAvatar} onChange={imageOnChange} />
        </div>
        <div className="detailTeacher__infor-right">
          <div className="detailTeacher__info">
            <span className="detailTeacher__label">Mã giáo viên:</span>
            <span>{oneTeacher.id}</span>
            <span className="detailTeacher__label">Họ tên:</span>
            <span>{oneTeacher.fullName}</span>
            <span className="detailTeacher__label">Ngày sinh:</span>
            <span>{moment(oneTeacher.birthday).format("DD/MM/YYYY")}</span>
            <span className="detailTeacher__label">Số điện thoại:</span>
            <span>{oneTeacher.phone}</span>
            <span className="detailTeacher__label">Email:</span>
            <span className="detailTeacher__info-address">
              {oneTeacher.email}
            </span>
            <span className="detailTeacher__label">Địa chỉ:</span>
            <span className="detailTeacher__info-address">
              {oneTeacher.address}
            </span>
          </div>
          <div className="detailTeacher__group-btn">
            <Button
              color={Color.Blue}
              className="detailTeacher__btn--margin-left"
              onClick={() => history.push(`/updateteacher/${idTeacher}`)}
            >
              Cập nhật thông tin
            </Button>
          </div>
        </div>
      </div>
      {/* <h3 className="detailTeacher__title-timetable">Thời khóa biểu</h3> */}
      {/* <div className="detailTeacher__timetable"> */}
      {/* <div className="detailTeacher__header">
          <div className="detailTeacher__semester">
            <span>Học kì</span>
            <Dropdown
              data={listSemester}
              className="detailTeacher__dropdown"
              onChange={(value: any) => console.log(value)}
            />
          </div>
          <div className="detailTeacher__year">
            <span>Năm học</span>
            <Dropdown
              data={listYear}
              className="detailTeacher__dropdown"
              onChange={(value: any) => console.log(value)}
            />
          </div>
          <Button isSecondaryBtn={true} className="detailTeacher__btn">
            Xem
          </Button>
        </div> */}
      {/* </div> */}
      {/* <div className="detailTeacher__schedule">
        <ScheduleStudent data={timetableStudent} />
      </div> */}
    </div>
  );
};
